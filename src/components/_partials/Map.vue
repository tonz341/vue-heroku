<style>
    #map {
        height: 1000px;
        width: 100%;
      }
      #infowindow-content .title {
        font-weight: bold;
      }

      #infowindow-content {
        display: none;
      }

      #map #infowindow-content {
        display: inline;
      }

      .pac-card {
        margin: 10px 10px 0 0;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        font-family: Roboto;
      }

      #pac-container {
        padding-bottom: 12px;
        margin-right: 12px;
      }

      .pac-controls {
        display: inline-block;
        padding: 5px 11px;
      }

      .pac-controls label {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 300;
      }

      #pac-input {
        left: 5px !important;
        top: 8px !important;
        height: 32px;
        border-radius: 5px;
        padding: 5px;
        width: 80%;
      }

      #title {
        color: #fff;
        background-color: #4d90fe;
        font-size: 25px;
        font-weight: 500;
        padding: 6px 12px;
      }
      #target {
        width: 345px;
      }
    </style>

<template>
    <div class="row">
     <div class="col-md-12">
      <h3>Map Test Api</h3>
      <div style="margin-bottom:2px">
         <input type="text" v-model="coords.lat" readonly>
         <input type="text" v-model="coords.lng" readonly> 
      </div>
      <div>
        <button @click="getMyLocation" class="btn btn-success btn-sm">Find me</button>
        <button @click="" class="btn btn-primary btn-sm" :disabled="!coords.lat || !coords.lng">Save my location</button>
      </div>
     </div>
        <div class="col-md-12">
            <small>{{ coords.status }}</small>
            <input v-show="coords.status=='Success'" id="pac-input" class="controls form-control" type="text" placeholder="Search Box">
            <div id="map"></div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'map',
  data () {
    return {
      map : null,
      coords : {
          lat : null,
          lng : null,
          status : 'Loading map'
      }
    }
  },
  computed: {

  },
  mounted () {
     this.getMyLocation();
  },
  methods: {
    test() {

    },
    myPins() {
        let coords = [
            {
                name : "Susan's Beach",
                lat : 5.8795548,
                lng: 125.08312368,
                region: 'Saranggani'
            }, 
            {
                name : "London Beach",
                lat : 5.990087,
                lng: 125.1196577,
                region: 'General Santos'
            }, 
            {
                name : "Lake Agco",
                lat : 7.0174854,
                lng: 125.2231014,
                region: 'Kidapawan'
            }, 
            {
                name : "Susan's Beach",
                lat : 5.8795548,
                lng: 125.08312368,
                region: 'Saranggani'
            }, 
            {
                name : "Lake Sebu",
                lat : 6.2447394,
                lng: 124.5528387,
                region: 'South Cotabato'
            }, 
        ]
        
        for(let i  in coords)
        {
            new google.maps.Marker({
                position: {lat: coords[i]['lat'], lng: coords[i]['lng']},
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'
            });
        }
    },

    getMyLocation() {
        let self = this;

        navigator.geolocation.getCurrentPosition(function(response) {
            self.coords.lat = response.coords.latitude;
            self.coords.lng = response.coords.longitude;

            self.init (response.coords.latitude, response.coords.longitude);
            self.coords.status = "Success";
            console.log('Success')
        }, function(error) {
             console.log(error.message, 'Retry')
             self.coords.status = error.message;
            //  setTimeout(() => {
            //     self.getMyLocation();
            //  }, 3000);
        },{timeout:5000});
    },
    init (lat, lng) {
        // this.lat = lat;
        // this.lng = lng;

        let position = { lat: lat, lng: lng };
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: position,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_RIGHT
          },
        });

        new google.maps.Marker({
            position: position,
            map: this.map,
            title: 'Your current location!',
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png'
        });  

        this.myPins();
        this.searchArea();
    },

    searchArea() {
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            this.map.addListener('bounds_changed', function() {
            searchBox.setBounds(this.map.getBounds());
            }.bind(this));

            searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            this.coords.lat = places[0].geometry.location.lat();
            this.coords.lng = places[0].geometry.location.lng();

            new google.maps.Marker({
                    position: { lat: this.coords.lat, lng: this.coords.lng },
                    map: this.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png'
            });
        }.bind(this));
    },

    waypoints() {
        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(this.map);

        var start = new google.maps.LatLng(this.lat, this.lng);
        var end;
        var request;

        end = new google.maps.LatLng(coords[i]['lat'], coords[i]['lng']);

        request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.WALKING
        };

        directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        }});
    }
  }
}
</script>

