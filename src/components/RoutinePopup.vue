<template>
    <v-card scrollable>
      <!--Header-->
      <v-img max-height="150" :src="routine.image" class="deg">
        <v-layout row>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" icon class="mr-6 mt-3 white--text closeBtn" @click="closePop()"><v-icon>mdi-close</v-icon></v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
        </v-layout>
      </v-img>
      <v-card-title class="deg white--text font-weight-bold">
        <span>{{ routine.name }}</span>
        <v-spacer/>
        <!-- <v-rating hover length="5" size="25" background-color="white" color="white" :value="routine.rating" empty-icon="mdi-star-outline" full-icon="mdi-star" half-icon="mdi-star-half-full"/> -->
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn @click="link=true" v-on="on" fab small dark depressed color="rgb(0,0,0,0)"><v-icon>mdi-share-variant-outline</v-icon></v-btn>
          </template>
          <span>Compartir rutina</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" fab small dark depressed color="rgb(0,0,0,0)" class="mx-2"><v-icon>mdi-circle-edit-outline</v-icon></v-btn>
          </template>
          <span>Editar rutina</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <!-- Cambiar por addFav en @click e isFav en condicional ? -->
            <v-btn v-on="on" fab small dark depressed color="rgb(0,0,0,0)" @click="favorite=!favorite"><v-icon>{{ favorite ? 'mdi-heart':'mdi-heart-outline' }}</v-icon></v-btn>
          </template>
          <span>Añadir a favoritos</span>
        </v-tooltip>
      </v-card-title>
      <v-spacer/>

      <v-card-text class="ma-3" v-if="link">Link: {{"server.com/explore/" + routine.id}} (server.com sería la dirección final de la pagina)</v-card-text>

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
            <span class="font-weight-bold">{{ routine.isPublic ? 'Pública':'Privada' }}</span>
          </v-flex>
          <!-- <v-flex xs6 md4 class="mb-3" v-show="routine.equipment">
            <v-icon small left>mdi-dumbbell</v-icon>
            <span class="font-weight-bold">Requiere equipamiento</span>
          </v-flex> -->
          <v-flex xs12 md12 class="text-justify">
            <v-icon small left>mdi-information-outline</v-icon>
            <span class="font-weight-bold">Descripción: </span>{{ routine.description }}</v-flex>
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
                    <v-flex class="caption">{{ exercise.repetitions===0 ? 'Duración: '+ exercise.duration+' seg' : 'Repeticiones: ' + exercise.repetitions }}</v-flex>
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
    </v-card>
</template>

<script>
export default {
    name: 'RoutinePopup',
    props: {
      //Solo deberia recibir la routine
        routine: Object,
        cycles: Array,
        exercises: Array,
    },
    data () {
        return {
            favorite: false,
            link: false
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