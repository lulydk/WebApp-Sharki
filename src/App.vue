<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view>
        <Home></Home>
      </router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Home from './views/Home';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: 'App',

  components: {
    Home, Navbar, Footer
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