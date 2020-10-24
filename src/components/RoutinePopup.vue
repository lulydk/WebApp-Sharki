<template>
  <v-container class="white">
    <h1 v-if="!loaded" align="center">
      <v-progress-circular indeterminate color="sharkyPurple"></v-progress-circular>
    </h1>
    <v-card scrollable v-if="loaded">
      <!--Header-->
      <v-img :src="routine_image" class="deg" max-height="150">
        <v-layout row>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-on="on" class="mr-6 mt-3 white--text closeBtn" icon @click="closePop()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Cerrar</span>
          </v-tooltip>
        </v-layout>
      </v-img>
      <v-card-title class="deg white--text font-weight-bold">
        <span>{{ routine.name }}</span>
        <v-spacer />
        <!-- <v-rating hover length="5" size="25" background-color="white" color="white" :value="routine.rating" empty-icon="mdi-star-outline" full-icon="mdi-star" half-icon="mdi-star-half-full"/> -->
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" color="rgb(0,0,0,0)" dark depressed fab small @click="link=true">
              <v-icon>mdi-share-variant-outline</v-icon>
            </v-btn>
          </template>
          <span>Compartir rutina</span>
        </v-tooltip>
        <v-tooltip bottom v-if="routine.creator.id === currentUser.id">
          <template v-slot:activator="{on}">
            <v-btn v-on="on" class="mx-2" color="rgb(0,0,0,0)" dark depressed fab small>
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Editar rutina</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <!-- Cambiar por addFav en @click e isFav en condicional ? -->
            <v-btn v-on="on" color="rgb(0,0,0,0)" dark depressed fab small @click="changeFavorite()">
              <v-icon>{{ favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </template>
          <span>Añadir a favoritos</span>
        </v-tooltip>
      </v-card-title>
      <v-spacer />

      <v-card-text v-if="link" class="ma-3">Link: {{ "server.com/explore/" + routine.id }} (server.com sería la
        dirección
        final de la pagina)
      </v-card-text>

      <!--Info Rutina-->
      <v-card-subtitle>
        <v-layout class="mt-3" row>
          <v-flex class="mb-3" md4 xs6>
            <v-icon left small>mdi-flash</v-icon>
            <span class="font-weight-bold">Dificultad: </span>{{ routine.difficulty }}
          </v-flex>
          <!-- <v-flex xs6 md4 class="mb-3">
          <v-icon small left>mdi-timer-outline</v-icon>
          <span class="font-weight-bold">Duracion: </span>{{ routine.duration }}
        </v-flex> -->
          <v-flex class="mb-3" md4 xs6>
            <v-icon left small>{{ routine.isPublic ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}</v-icon>
            <span class="font-weight-bold">{{ routine.isPublic ? 'Pública' : 'Privada' }}</span>
          </v-flex>
          <v-flex class="mb-3" md4 xs6>
            <span class="font-weight-bold">Creador:</span>
            <span> {{routine.creator.username}}</span>
          </v-flex>
          <!--v-flex class="text-justify" md12 xs12>
          <v-icon left small>mdi-information-outline</v-icon>
          <span class="font-weight-bold">Descripción: </span>{{ routine.detail }}
        </v-flex-->
          <!-- reemplazar cycles por getCycles(routine) -->
          <!-- <v-virtual-scroll bench="1" :items="cycles" height="200" item-height="415">
        <template v-slot:default="{ item }">
        <v-container :key="item.id"> -->
          <v-container v-for="cycle in cycles" :key="cycle.order">
            <v-row class="px-3 py-2 sharkyPurple white--text font-weight-bold">
              {{ cycle.name }}
              <v-spacer />
              <span class="caption">Repeticiones: {{ cycle.repetitions }}</span>
            </v-row>
            <v-row>
              <v-expansion-panels flat>
                <v-expansion-panel v-for="exercise in exercises[cycle.order]" :key="exercise.order"
                  class="sharkyBack mt-1">
                  <v-expansion-panel-header>
                    <v-layout row>
                      <v-flex class="font-weight-bold" xs12>{{ exercise.name }}</v-flex>
                      <v-flex class="caption">{{
                        exercise.repetitions === 0 ? 'Duración: ' + exercise.duration + ' seg' : 'Repeticiones: ' + exercise.repetitions
                      }}
                      </v-flex>
                    </v-layout>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col class="caption text-justify mb-3 mr-6">{{ exercise.detail }}</v-col>
                      <v-col v-if="getExerciseImage(cycle.order, exercise.id)!==undefined" cols="4">
                        <v-img :src="getExerciseImage(cycle.order, exercise.id)" width="200" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
        </v-layout>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    CyclesApi,
    ExercisesApi,
    FullCycle,
    FullExercise,
    FullRoutine,
    FullUser,
    ImagesApi,
    RoutinesApi,
    UsersApi
  } from "@/api";

  export default Vue.extend({
    name: 'RoutinePopup',
    props: {
      //Solo deberia recibir la routine
      routine_id: Number,
    },
    async mounted() {
      let favourites: FullRoutine[] | undefined;
      try {
        this.routine = await RoutinesApi.getRoutine(this.routine_id);
        this.currentUser = await UsersApi.getLoggedUser();

        if (!this.routine.isPublic && this.routine.creator.id !== this.currentUser.id)
          this.closePop();

        favourites = (await UsersApi.favRoutines(0, 100)).results;
        this.cycles = (await CyclesApi.findCycles(this.routine_id, 0, 100)).results;
        for (let cyc of this.cycles) {
          if (cyc.type != 'exercise')
            continue;
          this.exercises[cyc.order] = (await ExercisesApi.findExercises(this.routine_id, cyc.id, 0, 100)).results;
          this.execImageCombo[cyc.order] = [];
          for (let exc of this.exercises[cyc.order]) {
            let image = (await ImagesApi.findExerciseImages(this.routine_id, cyc.id, exc.id, 0, 100)).results
            .pop();
            this.execImageCombo[cyc.order][exc.id] = {
              exercise: exc,
              image: image?.url
            };
            if (this.routine_image == "" && image !== undefined)
              this.routine_image = image.url;
          }
        }
      } catch (e) {
        console.log('ERROR');
        this.closePop();
      }

      //Veo si la rutina es favorita
      if (favourites?.filter(routine => routine.id === this.routine_id).pop() !== undefined)
        this.favorite = true;

      this.loaded = true;
    },
    data() {
      return {
        favorite: false,
        link: false,
        loaded: false,
        routine_image: "" as string,
        routine: {} as FullRoutine,
        currentUser: {} as FullUser,
        cycles: [] as FullCycle[],
        exercises: [
          []
        ] as FullExercise[][],
        execImageCombo: [
          []
        ] as {
          exercise: FullExercise,
          image: string | undefined
        } [][]
      }
    },
    methods: {
      closePop() {
        this.$emit('closePop');
      },
      getExerciseImage(cycleOrder: number, execID: number): string | undefined {
        return this.execImageCombo[cycleOrder][execID].image;
      },
      async changeFavorite() {
        try {
          if (this.favorite)
            await UsersApi.unfavRoutine(this.routine_id);
          else
            await UsersApi.favRoutine(this.routine_id);
          this.favorite = !this.favorite;
        } catch (e) {
          console.log('NO SE PUDO CAMBIAR EL FAVORITO');
        }
      }
    }
  })
</script>

<style scoped>
  .deg {
    background-image: linear-gradient(to right, #5a00e0, #9752ff);
  }
</style>