<template>
    <v-card scrollable>
      <!--Header-->
      <v-img max-height="150" :src="routine.image" class="deg">
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-6 mt-3 white--text closeBtn" @click="closePop()"><v-icon>mdi-close</v-icon></v-btn>
        </v-layout>
      </v-img>
      <v-card-title class="deg white--text font-weight-bold">
        <span>{{ routine.name }}</span>
        <v-spacer/>
        <v-rating hover length="5" size="25" background-color="white" color="white" :value="routine.rating" empty-icon="mdi-star-outline" full-icon="mdi-star" half-icon="mdi-star-half-full"/>
      </v-card-title>
      <v-spacer/>

      <!--Info Rutina-->
      <v-card-subtitle>
        <v-layout row class="mt-3">
          <v-flex xs6 md4 class="mb-3">
            <v-icon small left>mdi-flash</v-icon>
            <span class="font-weight-bold">Dificultad: </span>{{ routine.difficulty }}
          </v-flex>
          <!-- <v-flex xs6 md4 class="mb-3">
            <v-icon small left>mdi-timer-outline</v-icon>
            <span class="font-weight-bold">Duracion: </span>{{ routine.duration }}
          </v-flex> -->
          <v-flex xs6 md4 class="mb-3">
            <v-icon small left>{{ routine.isPublic ? 'mdi-eye-outline':'mdi-eye-off-outline' }}</v-icon>
            <span class="font-weight-bold">{{ routine.isPublic ? 'Publica':'Privada' }}</span>
          </v-flex>
          <!-- <v-flex xs6 md4 class="mb-3" v-show="routine.equipment">
            <v-icon small left>mdi-dumbbell</v-icon>
            <span class="font-weight-bold">Requiere equipamiento</span>
          </v-flex> -->
          <v-flex xs12 md12 class="text-justify">
            <v-icon small left>mdi-information-outline</v-icon>
            <span class="font-weight-bold">Descripcion: </span>{{ routine.description }}</v-flex>
        </v-layout>
      </v-card-subtitle>
      <v-divider/>
    
      <!--Ciclos y Ejercicios-->
      <v-row class="font-weight-bold mx-3 my-2">Ejercicios</v-row>
      <!-- reemplazar cycles por getCycles(routine) -->
      <v-virtual-scroll bench="1" :items="cycles" height="200" item-height="415">
        <template v-slot:default="{ item }">
        <v-container :key="item.id">
          <v-row class="px-3 py-2 sharkyPurple white--text font-weight-bold">
            {{ item.name }}
            <v-spacer/>
            <span class="caption">Repeticiones: {{ item.repetitions }}</span>
          </v-row>
          <v-row>
            <v-expansion-panels flat>
              <!-- reemplazar exercises por getExercises(cycle) -->
              <v-expansion-panel class="sharkyBack mt-1" v-for="exercise in exercises" :key="exercise.id">
                <v-expansion-panel-header>
                  <v-layout row>
                    <v-flex xs12 class="font-weight-bold">{{ exercise.name }}</v-flex>
                    <v-flex class="caption">{{ exercise.repetitions===0 ? 'Duracion: '+ exercise.duration+' seg' : 'Repeticiones: ' + exercise.repetitions }}</v-flex>
                  </v-layout>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="caption text-justify mb-3 mr-6">{{ exercise.detail }}</v-col>
                    <v-col cols="4" v-if="exercise.img!==undefined"><v-img width="200" :src="exercise.img"/></v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
        </template>
      </v-virtual-scroll>

      <v-divider/>

      <!--Fav y Share-->
      <v-card-actions>
        <v-spacer/>
        <v-btn fab depressed small class="sharkyBack"><v-icon>mdi-share-variant-outline</v-icon></v-btn>
        <!-- Cambiar por addFav en @click e isFav en condicional ? -->
        <v-btn fab dark depressed small class="sharkyPurple" @click="favorite=!favorite"><v-icon>{{ favorite ? 'mdi-heart':'mdi-heart-outline' }}</v-icon></v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'RoutinePopup',
    props: {
        routine: Object,
        cycles: Array,
        exercises: Array,
    },
    data () {
        return {
            favorite: false,
        }
    },
    methods: {
    getCycles () {

      },
      getExercises () {

      },
      addFav () {
        
      },
      isFav () {

      },
      closePop () {
          this.$emit('closePop');
      }
    }
}
</script>

<style scoped>
.deg {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }
</style>