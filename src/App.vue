<template>
  <v-app>
    <Navbar></Navbar>
    <LogIn/>
    <v-main>
      <router-view>
        <Home></Home>
      </router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';
import Navbar from "./components/Navbar.vue";
import LogIn from "./components/LogIn.vue"
import Footer from "./components/Footer.vue";

export default Vue.extend({
  name: 'App',

  components: {
    Home, Navbar, LogIn, Footer
  },

  data: () => ({
    //
  }),
});
</script>

<style scoped>
  * {
    font-family: 'Open Sans', sans-serif;
  }
</style>