<template>
  <v-card rounded class="sharkyBack">

    <!--Titulo general-->
    <v-container>
      <v-card-title class="sharkyPurple--text d-inline-block" width="80%">
        <h2>Añadir ejercicio</h2>
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
               depressed>
          Aceptar
        </v-btn>
      </span>
    </v-container>

    <!--Seccion de biblioteca-->
    <v-card-title class="font-weight-bold sharkyLight white--text">
      <h3 class="ml-5">Biblioteca</h3>
    </v-card-title>

    <v-slide-group>
      <v-slide-item v-for="exc in exercise_db" :key="exc.id">
        <ExerciseCard :exercise=exc
                      :exercises_db=exercise_db
                      :images_db=images_db
                      class="mx-2 my-2"
        />
      </v-slide-item>
    </v-slide-group>

    <!--Seccion custom-->
    <v-card-title class="font-weight-bold sharkyLight white--text">
      <h3 class="ml-5">Personalizado</h3>
    </v-card-title>

    <v-container class="mb-0">
      <v-text-field class="mx-10"
                    filled
                    label="Nombre"
      />
      <v-text-field class="mx-10"
                    filled
                    label="Descripción"
      />
      <v-text-field class="mx-10"
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
        <v-text-field
            id="repes"
            class="repes"
            hide-details
            single-line
            solo
        />
        <v-text-field
            id="repes"
            class="repes mt-5"
            hide-details
            single-line
            solo
        />
      </v-container>
      <!--Imagen-->
      <v-img
          class="mr-15"
          src="https://www.65ymas.com/uploads/s1/21/05/60/como-deben-practicar-ejercicio-fisico-con-seguridad-los-mayores.jpeg"
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
    images_db: Array
  },
  methods: {
    cancelClicked: function () {
      this.$emit('cancelClicked');
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