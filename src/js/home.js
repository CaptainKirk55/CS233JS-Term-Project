import './general';

class PlaneFinder {
    constructor() {
        this.$form = document.querySelector("#regForm");
        this.$reg = document.querySelector("#reg");
        this.$submit = document.querySelector("#submit");
        this.$infoContainer = document.querySelector("#infoContainer");

        this.$form.addEventListener('submit', event => {
            this.onFormSubmit(event);
        });

        const $script = document.createElement('script');
        // the google maps api has to look exactly like this except for the callback
        $script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&`;
        document.querySelector('body').appendChild($script);
    }

    onFormSubmit(event) {
        event.preventDefault();
        console.log("FORM SUBMITTED");
        //Execute the API call
        //If api call fails show the error message
        //If it succeeds show the map and other data
        this.initMap(45, 45);
        
        this.$infoContainer.classList.remove("d-none");
    }

    initMap(latitude, longitude) {
        console.log("got " + latitude);//
      
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: latitude, lng: longitude}
        });
      
        const marker = new google.maps.Marker({
          map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: latitude, lng: longitude}
        });
      
        // marker.addListener('click', () => {
        //   infowindow.open(map,marker);
        // });
      
        // put some useful info about the event here
        // const infowindow = new google.maps.InfoWindow({
        //     content: "<h3>Event Location</h3><p>Event Address with all the contact details</p>"
        // });
      
        // infowindow.open(map,marker);
    }
}

let pf;
window.onload = () => {pf = new PlaneFinder()};