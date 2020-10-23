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
        <v-slide-item v-for="exc in exercise_db" :key="exc.id">
          <ExerciseCard :exercise=exc
                        :exercises_db=exercise_db
                        :images_db=images_db
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

    <v-container class="mb-0">
      <v-text-field v-model="current_exercise.name"
                    class="mx-10"
                    filled
                    label="Nombre"
      />
      <v-text-field v-model="current_exercise.detail"
                    class="mx-10"
                    filled
                    label="Descripción"
      />
      <v-text-field v-model="current_image.url"
                    class="mx-10"
                    filled
                    hide-details
                    label="Link a imagen"
      />
    </v-container>

    <v-card-actions>
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
            v-model="current_exercise.repetitions"
            class="repes"
            hide-details
            single-line
            solo
        />
        <!--Text Field de Segundos -->
        <v-text-field
            id="repes"
            v-model="current_exercise.duration"
            class="repes mt-5"
            hide-details
            single-line
            solo
        />
      </v-container>
      <!--Imagen-->
      <v-img
          v-if="current_image.url !== ''"
          :src=current_image.url
          class="mr-15"
          width="50%"

      />
    </v-card-actions>

  </v-card>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "ExercisePopup",
  components: {
    ExerciseCard
  },
  props: {
    //Si es undefined no me pasaron el parametro
    current_exercise: Object,
    current_image: Object,
    exercise_db: Array,
    images_db: Array,
    library: Boolean,
    modify: Boolean
  },
  methods: {
    changeCard: function (cardToChange) {
      this.current_exercise = cardToChange.exercise;
      this.current_image = cardToChange.image;
    },
    acceptClicked: function () {
      this.$emit('acceptClicked', {'exercise': this.current_exercise, 'image': this.current_image});
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
}
</script>

<style scoped>
.repes {
  width: 50px;
}

#repes {
  width: 50px;
}
</style>