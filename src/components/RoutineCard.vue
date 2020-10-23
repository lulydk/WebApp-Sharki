<template>
<v-container>

  <!--Preview Card-->
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-card class="deg" v-on="on" rounded="xl" width="350">
        <v-img height="150px" :src="routine.image"></v-img>
        <v-row align="center" justify="start">
            <v-card-subtitle class="ml-3 white--text">{{ routine.name }}</v-card-subtitle>
            <v-spacer/>
            <v-icon class="mr-1" color="white" small>mdi-flash</v-icon>
            <span class="white--text caption mr-2">{{ routine.difficulty }}</span>
            <v-icon class="mr-1" color="white" small>mdi-timer-outline</v-icon>
            <span class="white--text mr-7 caption">{{ routine.duration }}</span>
        </v-row>
      </v-card>
    </template>
    
    <!--PopUp Detail-->
    <v-card scrollable>
      <!--Header-->
      <v-img max-height="150" :src="routine.image" class="deg">
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-6 mt-3 white--text closeBtn" @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
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
          <v-flex xs6 md4 class="mb-3">
            <v-icon small left>mdi-timer-outline</v-icon>
            <span class="font-weight-bold">Duracion: </span>{{ routine.duration }}
          </v-flex>
          <v-flex xs6 md4 class="mb-3">
            <v-icon small left>{{ routine.isPublic ? 'mdi-eye-outline':'mdi-eye-off-outline' }}</v-icon>
            <span class="font-weight-bold">{{ routine.isPublic ? 'Publica':'Privada' }}</span>
          </v-flex>
          <v-flex xs6 md4 class="mb-3" v-show="routine.equipment">
            <v-icon small left>mdi-dumbbell</v-icon>
            <span class="font-weight-bold">Requiere equipamiento</span>
          </v-flex>
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
                  <v-layout row>
                    <v-flex xs12 md8 class="caption text-justify mb-3 mr-6">{{ exercise.detail }}</v-flex>
                    <v-flex><v-img width="200" :src="exercise.img"/></v-flex>
                  </v-layout>
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
        <!-- Cambiar por addFav en @click e isFav en condicional -->
        <v-btn fab dark depressed small class="sharkyPurple" @click="favorite=!favorite"><v-icon>{{ favorite ? 'mdi-heart':'mdi-heart-outline' }}</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-container>
</template>

<script>
  module.exports = {
    props: {
      routine: Object,
      favorite: false,
    },
    data () {
      return {
        dialog: false,
        cycles: [
          { name:'Warmup', id: '1', repetitions: 1 },
          { name: 'Exercises', id: '2', repetitions: 2 },
          { name: 'Cooldown', id: '3', repetitions: 1 }
        ],
        exercises: [
          { name:'Ejercicio 1', id: '1', repetitions: 0, duration: 30, img: 'https://images.unsplash.com/flagged/photo-1573556291531-a5d957d7e4e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60', detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'},
          { name:'Ejercicio 2', id: '2', repetitions: 2, duration: 0, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 3', id: '3', repetitions: 0, duration: 15, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 5', id: '5', repetitions: 0, duration: 20, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 6', id: '6', repetitions: 1, duration:0, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'}
        ]
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

      }
    }
  }
</script>

<style scoped>
    .deg {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }

    .closeBtn {
      background: rgba(255, 255, 255, 0.1);
    }

    #cycleCont {
      border-left: 12px solid white;
      border-right: 12px solid white;
    }
</style>