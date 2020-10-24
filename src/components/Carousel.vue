<template>
    <v-carousel v-if="loaded" cycle height="300" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="rout in routines" :key="rout.id">
            <v-sheet color="sharkyLight" height="100%">
                <v-img :src="images[rout.id]" height="300" gradient="to left, rgba(90,0,224,0.5), #9752FF">
                    <v-col class="mt-5 ml-5">
                        <span class="display-1 font-weight-semibold">{{ rout.name }}</span>
                    </v-col>
                    <v-col class="ml-5">
                        <v-icon small left>mdi-flash</v-icon>
                        <span class="font-weight-bold">Dificultad: </span>{{ rout.difficulty }}
                    </v-col>
                    <v-col cols="8" class="ml-5">
                        <v-icon small left>mdi-information-outline</v-icon>
                        <span class="font-weight-bold">Descripción: </span>{{ rout.description }}
                    </v-col>
                </v-img>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue'
import {CyclesApi, ExercisesApi, FullRoutine, ImagesApi, RoutinesApi} from "@/api";

export default Vue.extend({
  name: 'Carousel',
  data(){
    return{
      routines: [] as FullRoutine[],
      images: [] as string[],
      loaded: false
    }
  },
  async mounted() {
    try{
      this.routines = (await RoutinesApi.findRoutines(undefined, undefined, 0, 5, "dateCreated", "desc"))
          .results.filter(e => e.isPublic);

      for(let rout of this.routines){
        if(this.images[rout.id] != undefined)
          continue;
        let cycles = (await CyclesApi.findCycles(rout.id, 0, 100)).results;
        for (let cyc of cycles) {
          if (cyc.type != 'exercise')
            continue;
          let exercises = (await ExercisesApi.findExercises(rout.id, cyc.id, 0, 100)).results;
          for (let exc of exercises) {
            let image = (await ImagesApi.findExerciseImages(rout.id, cyc.id, exc.id, 0, 100)).results.pop();
            if (image !== undefined) {
              this.images[rout.id] = image.url;
              break;
            }
          }
        }
      }
      this.loaded = true;
    } catch (e) {
      console.log('Error al crear para el caroussel');
    }
  },
})
</script>