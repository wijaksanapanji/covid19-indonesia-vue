<template>
  <div class="card" :class="status">
    <img :src="require(`../assets/${icon}`)" alt="icon" class="card-icon" />
    <div class="card-detail">
      <h1>{{ data.value }}</h1>
      <p>{{ status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["status", "icon", "data"]
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 1rem 3rem;
  /* border-radius: 10px; */
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  color: #ffffff;
}

.confirmed {
  background-color: #f9ca24;
}

.death {
  background-color: #eb4d4b;
}

.recovered {
  background-color: #6ab04c;
}

.card-icon {
  width: 72px;
  height: 72px;
  margin-right: 2rem;
}

.card-detail h1 {
  font-weight: 700;
}

.card-detail p {
  font-weight: 700;
  text-transform: capitalize;
}
</style>