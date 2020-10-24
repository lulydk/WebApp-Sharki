<!--Vista de los ejercicios que el usuario tiene creados-->
<template>
  <div>

    <!--Heading y botones-->
    <div class="my-4 mx-10">
      <h1 class="d-inline-block sharkyPurple--text">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-book-open-blank-variant</v-icon>
        Biblioteca de Ejercicios
      </h1>
    </div>

    <v-divider/>

    <!--Cards de los ejercicios del usuario-->
    <v-container class="sharkyBack" fluid>
      <v-row class="ml-5" dense>
        <v-col v-for="exc in exercises" :key="exc.exercise.id">
          <EditableExcCard 
                          :exercise=exc.exercise
                          :image=exc.image
                          v-on:trashClicked="deleteExercise($event)"
                          modify
          />
        </v-col>
      </v-row>
    </v-container>

    <v-divider/>

    <v-dialog v-model="dialog" max-width="60%">
      <template v-slot:activator="{on}">
        <div class="my-5 mr-16 float-right">
          <v-btn v-on="on"
                 class="custom-transform-class text-none"
                 color="sharkyPurple"
                 dark
                 depressed
                 x-large
          >
            <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>
            Agregar ejercicio
          </v-btn>
        </div>
      </template>
      <ExercisePopup
                    v-on:cancelClicked="dialog=false"
                    v-on:acceptClicked="addCard($event)"
      />
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { Exercise, ExerciseImageCombo, FullExerciseImageCombo, Image, UsersApi } from '@/api';
import EditableExcCard from "@/components/EditableExcCard.vue";
import ExercisePopup from "@/components/ExercisePopup.vue";
import Vue from 'vue';

export default Vue.extend({
  name: "ExerciseLibrary",
  components: {ExercisePopup, EditableExcCard},
  async mounted() {
    this.exercises = await UsersApi.findLibraryExercises();
  },
  methods: {
    addCard: async function (data: ExerciseImageCombo) {
      this.dialog = false;

      const exerciseCombo = await UsersApi.addLibraryExercise(data.exercise, data.image ?? undefined);
      this.exercises.push(exerciseCombo);
    },
    deleteExercise: async function (id: number) {
      await UsersApi.deleteLibraryExercise(id);
      const index = this.exercises.findIndex(e => e.exercise.id == id);
      this.exercises.splice(index, 1);
    }
  },
  data: function () {
    return {
      dialog: false,
      new_exercise: {
        name: "",
        detail: "",
        type: "exercise",
        duration: 0,
        repetitions: 0,
      } as Exercise,
      new_image: {
        id: 10,
        number: 1,
        url: ""
      } as Image,
      exercises: [] as FullExerciseImageCombo[]
    }
  }
})
</script>

<style scoped>

</style>