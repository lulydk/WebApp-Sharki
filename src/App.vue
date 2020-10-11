<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>

    <!--Aca iria el Footer-->
  </v-app>
</template>

<script>

import Navbar from "./components/Navbar";

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  * {
    font-family: 'Open Sans', sans-serif;
  }
</style>