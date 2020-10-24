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
        <v-slide-item v-for="(exc, index) in exercise_db" :key="exc.id">
          <ExerciseCard :exercise=exc
                        :image=images_db[index]
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
      <v-text-field v-model="exercise_db[current].name"
                    class="mx-10"
                    filled
                    label="Nombre"
      />
      <v-text-field v-model="exercise_db[current].detail"
                    class="mx-10"
                    filled
                    label="Descripción"
      />
      <v-text-field v-model="images_db[current].url"
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
            v-model="exercise_db[current].repetitions"
            class="repes"
            hide-details
            single-line
            solo
        />
        <!--Text Field de Segundos -->
        <v-text-field
            id="repes"
            v-model="exercise_db[current].duration"
            class="repes mt-5"
            hide-details
            single-line
            solo
        />
      </v-container>
      <!--Imagen-->
      <v-img
          v-if="images_db[current]"
          :src=images_db[current].url
          class="mr-15"
          width="50%"

      />
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import { FullExercise, FullImage, ImagesApi, UsersApi } from '@/api';
import ExerciseCard from "@/components/ExerciseCard.vue";
import Vue from 'vue';

export default Vue.extend({
  name: "ExercisePopup",
  components: {
    ExerciseCard
  },
  data: function() {
    return {
    exercise_db: [] as FullExercise[],
    images_db:  [] as (FullImage | null)[],
    current: 0,
    loaded: false,
  }},
  props: {
    //Si es undefined no me pasaron el parametro
    library: Boolean,
    modify: Boolean
  },
  async mounted() {
    this.exercise_db = (await UsersApi.findLibraryExercises()).results;
    const library = await UsersApi.getExerciseLibrary();
    this.images_db = await Promise.all(this.exercise_db.map(async e => {
      let images = (await ImagesApi.findExerciseImages(library.routine.id, library.cycle.id, e.id)).results;
      return images.length > 0 ? images[0] : null;
    }));
    this.loaded = true;
  },
  methods: {
    changeCard: function (index: number) {
      this.current = index;
    },
    acceptClicked: function () {
      this.$emit('acceptClicked', {'exercise': this.exercise_db[this.current], 'image': this.images_db[this.current]});
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