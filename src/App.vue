<template>
  <!-- <News /> -->
  <!-- <router-link to="/">Go to Home</router-link> -->
  <!-- <router-link to="/news">Go to News</router-link> -->
  <router-view></router-view>
</template>

<script>
import News from "./components/News.vue";

export default {
  name: "App",
  components: {
    News,
  },
};
</script>
