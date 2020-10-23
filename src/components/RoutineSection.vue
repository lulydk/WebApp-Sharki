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

      <!--lista de ejercicios ya agregados a la seccion-->
      <v-slide-item v-for="exc in section_exercises" :key="exc.id">
        <EditableExcCard :exercise=exc
                         :exercises_db=exercises_db
                         :images_db=images_db
                         v-on:trashClicked="deleteCard($event)"
        />
      </v-slide-item>

      <!--Boton para agregar nuevo ejercicio a la seccion-->
      <v-slide-item>
        <v-dialog v-model="dialog" max-width="60%">
          <template v-slot:activator="{on}">
            <v-btn id="agregar"
                   v-on="on"
                   class="my-4 mx-2 sharkyPurple--text"
                   outlined
            >
              <v-icon class="mr-3">mdi-plus-circle</v-icon>
              Añadir ejercicio
            </v-btn>
          </template>
          <ExercisePopup :current_exercise=new_exercise
                         :current_image=new_image
                         :exercise_db=exercises_db
                         :images_db=images_db
                         v-on:cancelClicked="dialog=false"
                         v-on:acceptClicked="addCard($event)"
          />
        </v-dialog>
      </v-slide-item>

    </v-slide-group>

  </div>
</template>

<script>
import ExercisePopup from "@/components/ExercisePopup";
import EditableExcCard from "@/components/EditableExcCard";

export default {
  name: "RoutineSection",
  components: {
    EditableExcCard,
    ExercisePopup
  },
  props: {
    cycle: Object,
    exercises_db: Array,
    images_db: Array
  },
  methods: {
    addCard: function (data) {
      this.dialog = false;
      this.section_exercises.push(data.exercise);
      this.exercises_db.push(data.exercise);
      this.images_db.push(data.image);
    },
    //  Handler de card a borrar
    deleteCard: function (id) {
      this.section_exercises = this.section_exercises.filter(exc => exc.id !== id);
    },
    //  Evento para eliminar esta rutine section
    trashClicked: function () {
      this.$emit('trashClicked', this.cycle.id)
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
      section_exercises: [{
        "id": 1,
        "name": "Plancha",
        "detail": "",
        "type": "exercise",
        "duration": 30,
        "repetitions": 0,
        "order": 1
      }],
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