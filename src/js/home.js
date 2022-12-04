import './general';
import {getDate} from './dates';

class PlaneFinder {
    constructor() {
        this.$form = document.querySelector("#regForm");
        this.$reg = document.getElementById("reg");
        this.$submit = document.querySelector("#submit");
        this.$infoContainer = document.querySelector("#infoContainer");
        this.$errorContainer = document.querySelector("#errorContainer");
        this.words = document.getElementById("words");

        this.$form.addEventListener('submit', this.onFormSubmit.bind(this));

        const $script = document.createElement('script');
        $script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&`;
        document.querySelector('body').appendChild($script);
    }

    async onFormSubmit(event) {
        event.preventDefault();
        this.$errorContainer.classList.add("d-none");
        this.$infoContainer.classList.add("d-none");
        this.regNum = this.$reg.value;
        //Execute the API call
        //If api call fails show the error message
        //If it succeeds show the map and other data
        fetch(`https://airlabs.co/api/v9/flights?reg_number=${this.regNum}&api_key=${AIRLABS_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log("THEN");
                console.log(this.regNum);
                console.log(data);
                this.latitude = parseFloat(data.response[0].lat)
                this.longitude = parseFloat(data.response[0].lng)
                this.words.innerHTML = this.renderWords(data);
                console.log("lat: " + this.latitude);
                this.initMap(this.latitude, this.longitude);
                this.$infoContainer.classList.remove("d-none");
            })
            .catch(error => {
                //Either an invalid reg num or the plane is not in the air.
                console.log(error);
                this.$errorContainer.classList.remove("d-none");
            });    
    }

    renderWords(data)
    {
        //Find the direction that the plane is going
        let direction = data.response[0].dir;
        let directionWord = (direction < 22.5) ? "North" :
        (direction < 67.5) ? "Northeast" : 
        (direction < 112.5) ? "East" : 
        (direction < 157.5) ? "Southeast" : 
        (direction < 202.5) ? "South" : 
        (direction < 247.5) ? "Southwest" : 
        (direction < 292.5) ? "West" : 
        (direction < 337.5) ? "Northwest" : 
        "North"; 

        return `
        <p>Flight Number: ${data.response[0].flight_number}</p>
        <p>Direction: ${directionWord}</p>
        <p>Status: ${data.response[0].status}</p>
        <p>Last Updated: ${getDate(data.response[0].updated)}`
    }

    //Initialize the map with a given latitude and longitude
    initMap(latitude, longitude) {   
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: latitude, lng: longitude}
        });
      
        const marker = new google.maps.Marker({
          map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: latitude, lng: longitude},
          //icon: "./assets/plane.png"
        });
    }
}

let pf;
window.onload = () => {pf = new PlaneFinder()};