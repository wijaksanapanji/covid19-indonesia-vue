<template>
  <div class="container">
    <h1 class="title">Kasus COVID-19 Indonesia</h1>
    <div class="card-container">
      <Card icon="check.png" status="confirmed" :data="confirmed" />
      <Card icon="recovered.png" status="recovered" :data="recovered" />
      <Card icon="death.png" status="death" :data="deaths" />
    </div>
    <div class="source">
      <p>
        Data didapatkan dari :
        <a
          href="https://covid19.mathdro.id/api"
        >https://covid19.mathdro.id/api</a>
      </p>
    </div>
    <div class="map-container">
      <h1>Kasus COVID-19 di Seluruh dunia</h1>
      <p>Klik untuk melihat detail</p>
      <Map />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import Map from "../components/Map";

export default {
  name: "Home",
  components: {
    Card,
    Map
  },
  data() {
    return {
      url: "https://covid19.mathdro.id/api/countries/indonesia",
      confirmed: {},
      recovered: {},
      deaths: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await fetch(this.url)
        .then(res => res.json())
        .then(data => {
          this.confirmed = data.confirmed;
          this.recovered = data.recovered;
          this.deaths = data.deaths;
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
}

.card-container {
  display: flex;
  max-width: 900px;
}

.title,
.source {
  text-align: center;
}

.map-container {
  height: 400px;
  width: 100%;
  max-width: 1000px;
  margin: 2rem;
}

@media screen and (max-width: 768px) {
  .card-container {
    flex-direction: column;
  }
}
</style>