<template>
  <div class="container">
    <h1 class="title">Kasus COVID-19 Indonesia</h1>
    <div class="card-container">
      <Card icon="check.png" status="confirmed" :data="confirmed" />
      <Card icon="recovered.png" status="recovered" :data="recovered" />
      <Card icon="death.png" status="death" :data="deaths" />
    </div>
    <div class="source">
      <p>Data didapatkan dari :</p>
      <a href="https://covid19.mathdro.id/api">https://covid19.mathdro.id/api</a>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";

export default {
  name: "Home",
  components: {
    Card
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
  margin: 0 0.5rem;
}

.title,
.source {
  text-align: center;
}
</style>