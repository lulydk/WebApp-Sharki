<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text">
    <h2 class="pa-2 d-inline-block">{{ name }}</h2>
    <span class="pl-2 float-right mr-5">
      <h3 class="d-inline-block mr-2">Repeticiones:</h3>
      <v-text-field
          hide-details
          single-line
          type="number"
          class="d-inline-block"
      />
    </span>
    </div>

    <!--Ejercicios-->
    <v-container fluid class="sharkyBack">
      <v-row dense>
        <v-col v-for="n in 5" :key="n">
          <ExerciseCard/>
        </v-col>
        <v-col>
          <v-card width="300px" height="150px" rounded>
            <v-card-title>
              <v-btn class="ml-8 mt-9">
                Añadir ejecicio
                <v-icon class="ml-3">mdi-plus-circle</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "RoutineSection",
  components: {
    ExerciseCard
  },
  props: ['name']
}
</script>

<style scoped>
</style>