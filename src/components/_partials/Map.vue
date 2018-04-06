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
      
    @media only screen and (max-width: 544px) {
         #pac-input {
            width: 50%;
        }
    }
    </style>

<template>
    <div class="row">
     <div class="col-md-12">
      <h3>Map Test Api <small>- {{ geoLocationSupported ? 'Geolocation supported' : 'Geolocation not-supported' }}</small></h3> 
      
      <div v-if="!distance.active">
        <div style="margin-bottom:2px">
            <label>{{ coords.formatted_address }}</label> <br>
            <input type="hidden" v-model="coords.lat" readonly>
            <input type="hidden" v-model="coords.lng" readonly>
        </div>

        <div style="margin-bottom:2px">
            <button @click="getMyLocation" class="btn btn-success btn-sm" :disabled="!geoLocationSupported"><i class="fa fa-map-pin"></i> Find me</button>
            <button @click="saveLocation" class="btn btn-primary btn-sm" :disabled="!coords.lat || !coords.lng || !coords.formatted_address" v-if="currentUser"><i class="fa fa-save"></i> Save location</button>
            <button @click="distance.active=true" class="btn btn-inverse btn-sm"> <i class="fa fa-road"></i> Measure Distance</button>
        </div>
      </div>


    <div v-if="distance.active" style="margin-bottom:2px">
        <!-- <input type="hidden" v-model="distance.lat1" readonly>
        <input type="hidden" v-model="distance.lng1" readonly>
        <input type="hidden" v-model="distance.lat2" readonly>
        <input type="hidden" v-model="distance.lng2" readonly> -->

        <p style="color:green"><strong> Note: </strong> Choose your <strong style="color:darkviolet; text-decoration: underline">{{ distance.lng1==null ? 'start' : 'end' }}</strong> location</p>

        <p><button @click="resetDistance(1)" class="btn btn-sm" title="remove location 1" :disabled="distance.lng1==null"><i class="fa fa-minus"></i></button> {{ distance.formatted_address1 }} </p>
        <p><button @click="resetDistance(2)" class="btn btn-sm" title="remove location 2" :disabled="distance.lng2==null"><i class="fa fa-minus"></i></button> {{ distance.formatted_address2 }} </p>

        <div v-if="distance.data.distance && distance.data.duration">
            <span> <strong>Distance: </strong> {{ distance.data.distance.text }}</span> <br>
            <span> <strong>ETA Travel via Car: </strong> {{ distance.data.duration.text }}</span>
        </div>
        
        <button class="btn btn-sm btn-success" @click="calculateDistance" :disabled="distance.lng1==null && distance.lng2==null">Calculate Distance</button>
        <button class="btn btn-sm btn-cancel" @click="backDistance">Back</button>

    </div>

     </div>
        <div class="col-md-12">
            <!-- <small>{{ coords.status }}</small> -->
            <input v-show="coords.status=='Success'" id="pac-input" class="controls form-control" type="text" placeholder="Search Box">
            <div id="map"></div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'map',
  data () {
    return {
      map : null,
      coords : {
          lat : null,
          lng : null,
          formatted_address: 'No Selected Location',
          status : 'Loading map'
      },
      distance : {
          active: false,
          counter: 1,
          lat1 : null,
          lng1 : null,
          formatted_address1: null,
          lat2 : null,
          lng2 : null,
          formatted_address2: null,
          data : []
      }
    }
  },
  computed: {
      geoLocationSupported() {
           if(navigator.geolocation)
           {
               return true;
           }
           return false;
      },
       ...mapGetters({
      currentUser: 'getUser'
    })
  },
  mounted () {
    //  this.getMyLocation();
    this.start()
  },
  methods: {
    start() {
        this.init();
        
    },
    myPins() {
    window.axios.get('/admin/maps')
        .then((response) => {
           let coords = response.data;
           for(let i  in coords)
            {
                new google.maps.Marker({
                    position: {lat: parseFloat(coords[i]['lat']), lng: parseFloat(coords[i]['lng'])},
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'
                });
            }
        }).catch(error => {
        console.log(error.statusText)
    })
    },

    getMyLocation() {
        let self = this;
        this.coords.formatted_address = null;

        navigator.geolocation.getCurrentPosition(function(response) {
            self.coords.lat = response.coords.latitude;
            self.coords.lng = response.coords.longitude;

        let position = { lat: response.coords.latitude, lng: response.coords.longitude };

        self.map.setCenter(position);
        new google.maps.Marker({
            position: position,
            map: self.map,
            title: 'Your current location!',
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon32.png'
        });  

       var geocoder = new google.maps.Geocoder;

        geocoder.geocode({'location': position}, function(places, status) {
             if (status === 'OK') {
                 self.coords.formatted_address = places[0].formatted_address;
             }
        });


        }, function(error) {
             console.log(error.message, 'Retry')
             self.coords.status = error.message;
            //  setTimeout(() => {
            //     self.getMyLocation();
            //  }, 3000);
        },{timeout:5000});
    },
    init () {
        // this.lat = lat;
        // this.lng = lng;

        let position = { lat: 7.064525, lng: 125.6077665 };
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: position,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_RIGHT
          },
        });

        this.coords.status = "Success";

        new google.maps.Marker({
            position: position,
            map: this.map,
            title: 'Home!',
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png'
        });  

        this.searchArea();
        this.myPins();
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

                console.log(places)

                if (places.length == 0) {
                    return;
                }

                let formatted_address = places[0].formatted_address;
                let lat = parseFloat(places[0].geometry.location.lat());
                let lng = parseFloat(places[0].geometry.location.lng());

                if(this.distance.active == true ) {
                    if(this.distance.lat1 == null) {
                        this.distance.lat1 = lat;
                        this.distance.lng1 = lng;
                        this.distance.formatted_address1 = formatted_address;
                        $('#pac-input').val('');
                        this.distance.counter = 2;

                        new google.maps.Marker({
                            position: { lat: lat, lng: lng },
                            map: this.map,
                            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon13.png'
                        });
                        
                    } else {
                        this.distance.lat2 = lat;
                        this.distance.lng2 = lng;
                        this.distance.formatted_address2 = formatted_address;
                        $('#pac-input').val('');

                        new google.maps.Marker({
                            position: { lat: lat, lng: lng },
                            map: this.map,
                            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon13.png'
                        });
                    }
                }
                else {
                    this.coords.formatted_address = formatted_address;
                    this.coords.lat = lat;
                    this.coords.lng = lng;

                    new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        map: this.map,
                        icon: 'https://www.google.com/mapfiles/arrow.png'
                    });
                }
                this.map.setCenter({ lat: lat , lng: lng });

    
            }.bind(this)
        );
    },

    saveLocation() {
        let data = {
            formatted_address : this.coords.formatted_address,
            lat : this.coords.lat,
            lng : this.coords.lng
        }

        window.axios.post('/admin/maps/create', data)
            .then((response) => {
            alert('Successfully Pinned')
            console.log(response)
            this.clearData();
        })
        .catch(error => {
        console.log(error.statusText)
        })
    },

    clearData(){
        this.coords.formatted_address = null;
        this.coords.lat = null;
        this.coords.lng = null;
        $('#pac-input').val('');
    },

    calculateDistance() {

        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        let request = {
            origin: new google.maps.LatLng(this.distance.lat1, this.distance.lng1),
            destination: new google.maps.LatLng(this.distance.lat2, this.distance.lng2),
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
        };

        let directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(this.map);

        directionsService.route(request, function (response, status) {
            if(status=='OK') {
                directionsDisplay.setDirections(response);
                this.distance.data = response.routes[0].legs[0]
                return true;
            }
            alert('Invalid destinations')
            this.resetDistance(1)
            this.resetDistance(2)
            console.log(response)
        }.bind(this));

    },

    resetDistance(part) {
        if(part==1) {
            this.distance.lat1 = null;
            this.distance.lng1 = null;
            this.distance.formatted_address1 = null;
        } else {
            this.distance.lat2 = null;
            this.distance.lng2 = null;
            this.distance.formatted_address2 = null;
        }
    },

    backDistance() {
        this.distance.active=false
        this.init
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
            travelMode: google.maps.DirectionsTravelMode.WALKING,
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

