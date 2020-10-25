<template>
  <div>
    <div class="create mx-8 mb-4">
      <!--Heading-->
      <div  class="mb-4">
        <h1 v-if="loaded" class="d-inline-block sharkyPurple--text">
          <v-icon class="pb-2 sharkyPurple--text" large>mdi-home</v-icon>
          Bienvenido, {{ user.username }}
        </h1>
      </div>
      <Carousel/>
      <v-flex v-for="cat in categories" :key="cat" class="mt-5">
        <h3 class="d-inline-block mb-3">Categoría: {{ cat }}</h3>
        <v-slide-group show-arrows class="sharkyBack py-2">
          <v-slide-item v-for="r in routines" :key="r.id">
            <span><RoutineCard v-if="r.category.name === cat" :routine="r" :routine_id="r.id" /></span>
          </v-slide-item>
        </v-slide-group>
      </v-flex>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
  import RoutineCard from "../components/RoutineCard.vue";
  import Carousel from "../components/Carousel.vue";
  import Vue from 'vue';
import {CategoriesApi, FullRoutine, FullUser, RoutinesApi, UsersApi} from "@/api";

export default Vue.extend({
  name: 'Home',
  components: {
    RoutineCard,
    Carousel
  },
  data () {
    return {
      categories: [] as string[],
      routines: [] as FullRoutine[],
      user: {} as FullUser,
      loaded: false
    }
  },
  async mounted(){
    try {
      this.categories = (await CategoriesApi.findCategories(0, 100)).results.map(cat => cat.name);
      this.routines = (await RoutinesApi.findRoutines(undefined, undefined, 0, 100))
          .results.filter(routine => routine.isPublic);
      this.user = (await UsersApi.getLoggedUser());
      this.loaded = true;
    } catch (e) {
      console.log('ERROR AL CARGAR RUTINAS');
    }
  }
})
</script>