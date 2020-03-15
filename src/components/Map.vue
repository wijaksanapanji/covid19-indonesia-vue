<template>
  <div class="map">
    <l-map :zoom="zoom" :center="userLocation" :options="mapOptions">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="(country, index) in countries"
        :key="index"
        :lat-lng="[country.lat, country.long]"
      >
        <l-popup>
          <div class="popup-description">
            <p>
              <strong>{{ country.provinceState }} - {{ country.countryRegion }}</strong>
            </p>
            <p class="text-confirmed">Confirmed : {{ country.confirmed }}</p>
            <p class="text-recovered">Recovered : {{ country.recovered }}</p>
            <p class="text-deaths">Deaths : {{ country.deaths }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      userLocation: {
        lat: "",
        lng: ""
      },
      zoom: 2,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 8,
      mapOptions: {
        zoomSnap: 0.5
      },
      countries: []
    };
  },
  mounted() {
    this.getUserLocation();
    this.confirmedCase();
  },
  methods: {
    getUserLocation() {
      window.navigator.geolocation.getCurrentPosition(
        location => {
          this.userLocation.lat = location.coords.latitude;
          this.userLocation.lng = location.coords.longitude;
        },
        error => {
          console.log(error);
          // Coordinate Indonesia
          this.userLocation.lat = -2.548926;
          this.userLocation.lng = 118.0148634;
        }
      );
    },
    async confirmedCase() {
      await fetch("https://covid19.mathdro.id/api/confirmed")
        .then(res => res.json())
        .then(countries => {
          this.countries = countries;
        });
    }
  }
};
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  margin-bottom: 2rem;
}

.popup-description p {
  margin: 0;
  padding: 0;
}

.text-confirmed {
  color: #f9ca24;
}

.text-recovered {
  color: #6ab04c;
}

.text-deaths {
  color: #eb4d4b;
}
</style>