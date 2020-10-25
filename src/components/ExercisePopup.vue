<template>
  <v-card class="sharkyBack" rounded>

    <!--Titulo general-->
    <v-container>
      <v-card-title class="sharkyPurple--text d-inline-block" width="80%">
        <h2>{{getTitle()}}</h2>
      </v-card-title>
      <span class="ma-3 float-right d-inline-block">
        <v-btn class="mr-6 sharkyLight white--text custom-transform-class text-none"
               depressed
               @click="cancelClicked"
        >
          Cancelar
        </v-btn>
        <v-btn class="custom-transform-class text-none"
               color="sharkyPurple"
               dark
               depressed
               @click="acceptClicked"
        >
          Aceptar
        </v-btn>
      </span>
    </v-container>

    <!--Seccion de biblioteca-->
    <div v-if="library">
      <v-card-title class="font-weight-bold sharkyLight white--text">
        <h3 class="ml-5">Biblioteca</h3>
      </v-card-title>

      <v-slide-group>
        <v-slide-item v-for="(exc, index) in exercises" :key="exc.exercise.id">
          <ExerciseCard :exercise=exc.exercise
                        :image=exc.image
                        :index=index
                        class="mx-2 my-2"
                        v-on:cardClicked="changeCard($event)"
          />
        </v-slide-item>
      </v-slide-group>
    </div>

    <!--Seccion custom-->
    <v-card-title v-if="library" class="font-weight-bold sharkyLight white--text">
      <h3 class="ml-5">Personalizado</h3>
    </v-card-title>

    <v-container class="mb-0" v-if="loaded">
      <v-text-field v-model="exercises[current].exercise.name"
                    class="mx-10"
                    filled
                    label="Nombre"
      />
      <v-text-field v-model="exercises[current].exercise.detail"
                    class="mx-10"
                    filled
                    label="Descripción"
      />
      <v-text-field v-if="exercises[current].image"
                    v-model="exercises[current].image.url"
                    class="mx-10"
                    filled
                    hide-details
                    label="Link a imagen"
      />
    </v-container>

    <v-card-actions v-if="loaded">
      <v-radio-group class="ml-15" hide-details mandatory>
        <v-radio label="Repeticiones"
        />
        <v-radio class="mt-8"
                 label="Segundos"
        />
      </v-radio-group>
      <v-container>
        <!-- Text field de Repeticiones-->
        <v-text-field
            id="repes"
            v-model.number="exercises[current].exercise.repetitions"
            class="repes"
            hide-details
            single-line
            solo
        />
        <!--Text Field de Segundos -->
        <v-text-field
            id="repes"
            v-model.number="exercises[current].exercise.duration"
            class="repes mt-5"
            hide-details
            single-line
            solo
        />
      </v-container>
      <!--Imagen-->
      <v-img
          v-if="exercises[current].image"
          :src=exercises[current].image.url
          class="mr-15"
          width="50%"

      />
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import { Exercise, ExerciseImageCombo, UsersApi, Image } from '@/api';
import ExerciseCard from "@/components/ExerciseCard.vue";
import Vue from 'vue';

export default Vue.extend({
  name: "ExercisePopup",
  components: {
    ExerciseCard
  },
  data: function() {
    return {
    exercises: [] as ExerciseImageCombo[],
    current: 0,
    loaded: false,
    combo: {exercise: this.exercise, image: this.image} as ExerciseImageCombo
  }},
  props: {
    exercise: Object,
    image: Object,
    //Si es undefined no me pasaron el parametro
    library: Boolean,
    modify: Boolean
  },
  async mounted() {
    if(this.library) {
      if(this.exercise) {
        this.exercises.push(this.combo);
      }
      this.exercises = this.exercises.concat((await UsersApi.findLibraryExercises())
          .map(e => {
            // eslint-disable-next-line no-unused-vars
            let {order, ...reduced} = e.exercise;
            return {exercise: reduced, image: e.image ?? {number: 1} as Image};
          }));
    }
    else {
      const def = this.exercise ?? {
        exercise: {
          name: "",
          detail: "",
          type: Exercise.TypeEnum.Exercise,
          duration: 0,
          repetitions: 0
        }, image: {number: 1} as Image
      };
      this.exercises.push(def);
    }
    this.loaded = true;
  },
  methods: {
    changeCard: function (index: number) {
      this.current = index;
    },
    acceptClicked: function () {
      this.$emit('acceptClicked', this.exercises[this.current]);
    },
    cancelClicked: function () {
      this.$emit('cancelClicked');
    },
    getTitle: function () {
      if (this.modify)
        return "Modificar ejercicio";
      else
        return "Añadir ejercicio";
    }
  }
})
</script>

<style scoped>
.repes {
  width: 50px;
}

#repes {
  width: 50px;
}
</style>