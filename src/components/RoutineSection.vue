<template>
  <div>
    <!--Headings-->
    <div v-if="loaded" class="sharkyPurple white--text">
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
          v-model="repetitions"
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
      <v-slide-item v-for="e in exercises" :key="e.exercise.id">
        <EditableExcCard :exercise=e.exercise
                         :image=e.image
                         v-on:trashClicked="deleteCard"
                         v-on:cardEditted="cardEditted"
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
              library
              v-on:acceptClicked="addCard($event)"
              v-on:cancelClicked="dialog=false"
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
import {Cycle, CyclesApi, ExercisesApi, FullExercise, FullExerciseImageCombo, FullImage, ImagesApi} from '@/api';

interface RoutineEntry extends FullExerciseImageCombo {
  exercise: FullExercise
  image: FullImage | null
  exists: boolean
}

export interface SectionCallback {
  // eslint-disable-next-line no-unused-vars
  callback: (id: number) => Promise<void>
  cycle: Cycle
}

export default Vue.extend({
  name: "RoutineSection",
  components: {
    EditableExcCard,
    ExercisePopup
  },
  data: function () {
    return {
      exercises: [] as RoutineEntry[],
      dialog: false,
      loaded: false,
      repetitions: "0" as string
    }
  },
  props: {
    cycle: Object,
    routineId: Number,
    exists: Boolean
  },
  async mounted() {
    if(this.exists) {
      this.repetitions = this.cycle.repetitions;
      this.exercises = await Promise.all((await ExercisesApi.findExercises(this.routineId, this.cycle.id))
        .results
        .map(async exc => {
          const image = (await ImagesApi.findExerciseImages(this.routineId,this.cycle.id,exc.id)).results;
          return {exercise: exc, image: (image.length > 0 ? image[0] : null), exists: true};
        })
      );
    }
    this.loaded = true;
    this.$emit('register', { cycle: this.cycle, callback: this.upload } as SectionCallback);
  },
  methods: {
    addCard: async function (data: FullExerciseImageCombo) {
      this.dialog = false;
      this.exercises.push({
        exercise: data.exercise,
        image: data.image,
        exists: false
      });
      this.exercises.forEach((e, i) => e.exercise.order = i + 1);
    },
    //  Handler de card a borrar
    deleteCard: function (id: number) {
      const index = this.exercises.findIndex(e => e.exercise.id == id);
      const entry = this.exercises[index];
      this.exercises.splice(index, 1);
      if(entry.exists) {
        ExercisesApi.deleteExercise(this.routineId, this.cycle.id, entry.exercise.id);
      }
      this.exercises.forEach((e, i) => e.exercise.order = i + 1);
    },
    //  Evento para eliminar esta rutine section
    trashClicked: function () {
      this.$emit('trashClicked', this.cycle.order)
    },
    cardEditted(selected: FullExerciseImageCombo, id: number) {
      const index = this.exercises.findIndex(e => e.exercise.id == id);
      this.exercises.splice(index, 1, { exists: false, exercise: selected.exercise, image: selected.image });
      this.exercises.forEach((e, i) => e.exercise.order = i + 1);
    },
    async upload(routineId: number) {
      //console.log(this.cycle);
      this.cycle.repetitions = +this.repetitions;
      //Si el usuario ingresó 0, se le asigna 1 a la variable
      if (this.cycle.repetitions == '0')
        this.cycle.repetitions = 1;
      let cycleId: number = this.cycle.id;
      if(!this.exists)
        cycleId = (await CyclesApi.addCycle(routineId, this.cycle as Cycle)).id;
      else
        await CyclesApi.updateCycle(routineId, cycleId, this.cycle);

      await Promise.all(this.exercises.map(async e => {
        let exercise;
        if(!e.exists) {
          exercise = await ExercisesApi.addExercise(routineId, cycleId, e.exercise);
          if (e.image)
            await ImagesApi.addExerciseImage(routineId, cycleId, exercise.id, e.image);
        }
        else {
          exercise = await ExercisesApi.updateExercise(routineId, cycleId, e.exercise.id, e.exercise);
          if (e.image)
            await ImagesApi.updateExerciseImage(routineId, cycleId, exercise.id, e.image.id, e.image);
        }
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