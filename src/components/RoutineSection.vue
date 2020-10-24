<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text" v-if="loaded">
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
      <v-slide-item v-for="(exc, index) in exercises_db" :key="exc.id">
        <EditableExcCard :exercise=exc
                         :image=images_db[index]
                         v-on:trashClicked="deleteCard($event)"
        />
      </v-slide-item>

      <v-slide-item>
        <div/>
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
          <ExercisePopup 
                         v-on:cancelClicked="dialog=false"
                         v-on:acceptClicked="addCard($event)"
                         library
          />
        </v-dialog>
      </v-slide-item>

    </v-slide-group>

  </div>
</template>

<script lang="ts">
import ExercisePopup from "@/components/ExercisePopup.vue";
import EditableExcCard from "@/components/EditableExcCard.vue";
import Vue from 'vue';
import { Cycle, CyclesApi, ExercisesApi, FullExercise, FullImage, Image, ImagesApi } from '@/api';

export default Vue.extend({
  name: "RoutineSection",
  components: {
    EditableExcCard,
    ExercisePopup
  },
  data: function() {
    return {
      exercises_db: [] as FullExercise[],
      images_db: [] as (FullImage | null)[],
      dialog: false,
      loaded: false
    }
  },
  props: {
    cycle: Object,
  },
  async mounted() {
    this.loaded = true;
    this.$emit('register', this.upload);
  },
  methods: {
    addCard: async function (data: {exercise: FullExercise, image: FullImage | null}) {
      this.dialog = false;
      this.exercises_db.push(data.exercise);
      this.images_db.push(data.image);
    },
    //  Handler de card a borrar
    deleteCard: function (id: number) {
      const index = this.exercises_db.findIndex(e => e.id == id);
      this.exercises_db.splice(index, 1);
      this.images_db.splice(index, 1);
    },
    //  Evento para eliminar esta rutine section
    trashClicked: function () {
      this.$emit('trashClicked', this.cycle.order)
    },
    async upload(routineId: number) {
      console.log(this.cycle);
      const cycle = await CyclesApi.addCycle(routineId, this.cycle as Cycle)
      await Promise.all(this.exercises_db.map(async (e, index) => {
        const exercise = await ExercisesApi.addExercise(routineId, cycle.id, e);
        if(this.images_db[index])
          await ImagesApi.addExerciseImage(routineId, cycle.id, exercise.id, this.images_db[index] as Image);
      }))
    }
  },
})
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