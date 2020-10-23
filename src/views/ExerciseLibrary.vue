<!--Vista de los ejercicios que el usuario tiene creados-->
<template>
  <div>

    <!--Heading y botones-->
    <div class="my-4 mx-10">
      <h1 class="d-inline-block sharkyPurple--text">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-book-open-blank-variant</v-icon>
        Biblioteca de ejercicios
      </h1>
    </div>

    <v-divider/>

    <!--Cards de los ejercicios del usuario-->
    <v-container class="sharkyBack" fluid>
      <v-row class="ml-5" dense>
        <v-col v-for="exc in exercises_db" :key="exc.id">
          <EditableExcCard :exercise=exc
                           :exercises_db=exercises_db
                           :images_db=images_db
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
      <ExercisePopup :current_exercise=new_exercise
                     :current_image=new_image
                     :exercise_db=exercises_db
                     :images_db=images_db
                     v-on:cancelClicked="dialog=false"
                     v-on:acceptClicked="addCard($event)"
      />
    </v-dialog>

  </div>
</template>

<script>
import EditableExcCard from "@/components/EditableExcCard";
import ExercisePopup from "@/components/ExercisePopup";

export default {
  name: "ExerciseLibrary",
  components: {ExercisePopup, EditableExcCard},
  methods: {
    addCard: function (data) {
      this.dialog = false;
      this.exercises_db.push(data.exercise);
      this.images_db.push(data.image);
    }
  },
  data: function () {
    return {
      dialog: false,
      new_exercise: {
        "id": 10,
        "name": "",
        "detail": "",
        "type": "exercise",
        "duration": 0,
        "repetitions": 0,
        "order": 1
      },
      new_image: {
        "id": 10,
        "number": 1,
        "url": ""
      },
      exercises_db: [
        {
          "id": 1,
          "name": "Plancha",
          "detail": "",
          "type": "exercise",
          "duration": 30,
          "repetitions": 0,
          "order": 1
        },
        {
          "id": 2,
          "name": "Push-up",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 15,
          "order": 1
        },
        {
          "id": 3,
          "name": "Sentadilla",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 10,
          "order": 1
        },
        {
          "id": 5,
          "name": "Plancha",
          "detail": "",
          "type": "exercise",
          "duration": 30,
          "repetitions": 0,
          "order": 1
        },
        {
          "id": 7,
          "name": "Push-up",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 15,
          "order": 1
        },
        {
          "id": 9,
          "name": "Sentadilla",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 10,
          "order": 1
        },
      ],
      images_db: [
        {
          "id": 1,
          "number": 1,
          "url": "https://www.t-nation.com/system/publishing/articles/10001096/original/Unconventional-Workout-Abs.jpg?1515713332"
        },
        {
          "id": 2,
          "number": 1,
          "url": "https://lmimirror3pvr.azureedge.net/static/media/12867/2d5a7ea5-1c56-40e1-aba6-dbbfe959f35a/pushup-study_960x540.jpg"
        },
        {
          "id": 3,
          "number": 1,
          "url": "https://www.inposture.com/wp-content/uploads/2020/05/Sit-ups.jpg"
        },
        {
          "id": 5,
          "number": 1,
          "url": "https://www.t-nation.com/system/publishing/articles/10001096/original/Unconventional-Workout-Abs.jpg?1515713332"
        },
        {
          "id": 7,
          "number": 1,
          "url": "https://lmimirror3pvr.azureedge.net/static/media/12867/2d5a7ea5-1c56-40e1-aba6-dbbfe959f35a/pushup-study_960x540.jpg"
        },
        {
          "id": 9,
          "number": 1,
          "url": "https://www.inposture.com/wp-content/uploads/2020/05/Sit-ups.jpg"
        }]
    }
  }
}
</script>

<style scoped>

</style>