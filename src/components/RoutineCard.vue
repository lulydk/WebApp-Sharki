<template>
  <v-container>

    <!--Preview Card-->
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{on}">
        <v-card v-if="loaded" v-on="on" class="deg" rounded="xl" width="350">
          <v-img :src="routine_image" height="150px"></v-img>
          <v-row align="center" justify="start">
            <v-card-subtitle class="ml-3 white--text">{{ routine.name }}</v-card-subtitle>
            <v-spacer/>
            <v-icon class="mr-1" color="white" small>mdi-flash</v-icon>
            <span class="white--text caption mr-7">{{ routine.difficulty }}</span>
            <!-- <v-icon class="mr-1" color="white" small>mdi-timer-outline</v-icon>
            <span class="white--text mr-7 caption">{{ routine.duration }}</span> -->
          </v-row>
        </v-card>
        <v-card v-if="!loaded" rounded="xl" width="350">
          <h1 align="center">
            <v-progress-circular
                indeterminate
                color="sharkyPurple"
            ></v-progress-circular>
          </h1>
        </v-card>
      </template>

      <!--PopUp Detail-->
      <RoutinePopup :routine_id=routine_id
                    v-on:closePop="dialog=false"/>

    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import RoutinePopup from "./RoutinePopup.vue";
import Vue from 'vue';
import {CyclesApi, ExercisesApi, ImagesApi} from "@/api";

export default Vue.extend({
  props: {
    routine_id: Number,
    routine: Object,
  },
  components: {
    RoutinePopup
  },
  data() {
    return {
      dialog: false,
      routine_image: "",
      loaded: false
    }
  },
  async mounted() {
    try {
      let cycles = (await CyclesApi.findCycles(this.routine_id, 0, 100)).results;
      for (let cyc of cycles) {
        let exercises = (await ExercisesApi.findExercises(this.routine_id, cyc.id, 0, 100)).results;
        for (let exc of exercises) {
          let image = (await ImagesApi.findExerciseImages(this.routine_id, cyc.id, exc.id, 0, 100)).results.pop();
          if (cyc.type == 'exercise' && this.routine_image == "" && image !== undefined)
            this.routine_image = image.url;
        }
      }
      this.loaded = true;
    } catch (e) {
      console.log('ERROR AL CARGAR TARJETA')
    }
  }
})
</script>

<style scoped>
.deg {
  background-image: linear-gradient(to right, #5a00e0, #9752ff);
}
</style>