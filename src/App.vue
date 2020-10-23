<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view>
        <Home></Home>
      </router-view>
    </v-main>

    <!--Aca iria el Footer-->
  </v-app>
</template>

<script>

import Home from './views/Home';
import Navbar from "./components/Navbar";

export default {
  name: 'App',

  components: {
    Home, Navbar,
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