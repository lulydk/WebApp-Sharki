<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text">
      <v-btn depressed rounded class="sharkyPurple white--text">
        <h2>{{name}}</h2>
      </v-btn>
    </div>

    <v-layout class="mx-auto" row wrap>
      <v-flex class="mb-6" v-for="routine in routines" :key="routine.name">
        <RoutineCard :routine="routine" :routine_id=routine.id />
      </v-flex>
    </v-layout>

  </div>
</template>

<script lang="ts">
import RoutineCard from "@/components/RoutineCard.vue";
import Vue from 'vue'
import {FullRoutine, UsersApi} from "@/api";

export default Vue.extend({
  name: "Block",
  components: {
    RoutineCard
  },
  props: {name: String, favorites: Boolean},
  data () {
    return {
      routines: [] as FullRoutine[],
    }
  },
  async mounted (){
    try {
      if (this.favorites) {
        let favourites = (await UsersApi.favRoutines()).results;
        if (favourites != undefined)
          this.routines = favourites;
      } else
        this.routines = (await UsersApi.findCurrentUserRoutines()).results;
    } catch (e) {
      console.log('Error al cargar rutinas');
    }
  }
})
</script>

<style scoped>
.repes {
  width: 50px;
}
#repes {
  width: 50px;
}
</style>