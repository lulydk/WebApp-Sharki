<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text">
      <h3 class="d-inline-block ml-3">Nombre:</h3>
      <v-text-field v-model="cycle.name"
                    class="pa-4 d-inline-block mb-0 my-text-style"
                    clearable
                    flat
                    hide-details
                    outlined
      />
      <span class="pl-2 mt-5 float-right mr-5">
      <h3 class="d-inline-block mr-2">Repeticiones:</h3>
      <v-text-field
          id="repes"
          v-model="cycle.repetitions"
          class="repes d-inline-block"
          hide-details
          single-line
          solo
      />
      <v-btn class="ml-5" icon
             x-large
             @click="trashClicked">
        <v-icon class="white--text" x-large>mdi-trash-can</v-icon>
      </v-btn>
    </span>
    </div>

    <!--Ejercicios-->
    <v-slide-group class="sharkyBack" show-arrows>
      <v-slide-item v-for="exc in exercises" :key="exc.id">
        <ExerciseCard class="ma-4"
                      :exercise=exc
                      :image=getImage(exc.id)
                      v-on:trashClicked="deleteCard($event)"/>
      </v-slide-item>
      <v-slide-item>
        <v-btn id="agregar" class="ma-4 sharkyPurple--text"
               outlined>
          <v-icon class="mr-3">mdi-plus-circle</v-icon>
          Añadir ejercicio
        </v-btn>
      </v-slide-item>

    </v-slide-group>

  </div>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "RoutineSection",
  components: {
    ExerciseCard
  },
  props: {
    cycle: Object
  },
  data: function () {
    return {
      //Data de prueba
      exercises: [
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
      ],
      images: [
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
        }]
    }
  },
  methods: {
    //  Handler de card a borrar
    deleteCard: function (id) {
      this.exercises = this.exercises.filter(exc => exc.id !== id);
    },
    //  Evento para eliminar esta rutine section
    trashClicked: function () {
      this.$emit('trashClicked', this.cycle.id)
    },
    //  Devuelve la imagen correspondiente al ejercicio
    getImage: function (id) {
      return this.images.find(im => im.id === id);
    }
  }
}
</script>

<style scoped>
.repes {
  width: 50px;
}

#repes {
  width: 50px;
}

#agregar {
  border: solid 4px var(--v-sharkyPurple-base);
  padding: 70px 55px 70px 60px;
  border-radius: 20px;
}

.my-text-style >>> .v-text-field__slot input {
  color: white;
  width: 500px;
}

.v-text-field--outlined >>> fieldset {
  border-color: white;
  border-width: 3px;
}
</style>