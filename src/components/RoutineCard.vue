<template>
<v-container fluid>

  <!--Preview-->
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
    <v-card>
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

        <v-card-subtitle>
          <v-layout row class="mt-3">
            <v-flex xs6 md6 class="mb-3">
              <v-icon small left>mdi-flash</v-icon>
              <span class="font-weight-bold">Dificultad: </span>{{ routine.difficulty }}
            </v-flex>
            <v-flex xs6 md6 class="mb-3">
              <v-icon small left>mdi-timer-outline</v-icon>
              <span class="font-weight-bold">Duracion: </span>{{ routine.duration }}
            </v-flex>
            <v-flex xs6 md6 class="mb-3">
              <v-icon small left>mdi-dumbbell</v-icon>
              <span class="font-weight-bold">Equipamiento: </span>{{ routine.equipment }}
            </v-flex>
            <v-flex xs6 md6 class="mb-3">
              <v-icon small left>mdi-eye-outline</v-icon>
              <span class="font-weight-bold">{{ routine.isPublic ? 'Publica':'Privada' }}</span>
            </v-flex>
            <v-flex xs12 md12 class="text-justify">
              <v-icon small left>mdi-information-outline</v-icon>
              <span class="font-weight-bold">Descripcion: </span>{{ routine.description }}</v-flex>
          </v-layout>
        </v-card-subtitle>
        <v-divider class="mb-3"/>
        
        <!--Ciclos y Ejercicios-->
        <span class="font-weight-bold mx-3">Ejercicios</span>
        <!-- getCycles(routine) -->
        <v-data-iterator v-for="cycle in cycles" :key="cycle.name" hide-default-footer class="mx-3 mt-3">
          <template v-slot:header>
            <v-layout class="grey px-2">Hi</v-layout>
          </template>

        </v-data-iterator>


        <!--Fav y Share-->
        <v-card-actions>
          <v-spacer/>
          <!--v-btn icon><v-icon>mdi-share-variant-outline</v-icon></v-btn-->
          <v-btn color="warning" text>Anadir a favoritos</v-btn>
        </v-card-actions>
    </v-card>

  </v-dialog>

</v-container>
</template>

<script>
  module.exports = {
    props: {
      routine: Object,
    },
    data () {
      return {
        dialog: false,
        cycles: [
          { name:'Warmup' },
          { name: 'Exercises' },
          { name: 'Cooldown' }
        ]
      }
    },
    methods: {
      getCycles () {
        return null;
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
</style>