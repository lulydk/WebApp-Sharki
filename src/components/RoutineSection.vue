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
          class="repes d-inline-block"
          id="repes"
      />
    </span>
    </div>

    <!--Ejercicios-->
    <v-slide-group class="sharkyBack" show-arrows>
      <v-slide-item v-for="n in cards" :key="n">
        <ExerciseCard class="ma-4"
            v-on:trashClicked="deleteCard"/>
      </v-slide-item>
      <v-slide-item>
        <v-btn outlined class="ma-4 sharkyPurple--text"
               id="agregar"
               @click="cards++">
          <v-icon class="mr-3">mdi-plus-circle</v-icon>
          Añadir ejercicio
        </v-btn>
      </v-slide-item>

      <!-- Version vieja del add-->
      <!--v-slide-item>
        <v-card width="300px" height="150px"
                rounded class="ma-4 sharkyBack agregar"
                @click="cards++">
          <v-card-title class="ml-10 mt-10">
            <v-icon class="mr-3">mdi-plus-circle</v-icon>
            Añadir ejercicio
          </v-card-title>
        </v-card>
      </v-slide-item-->

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
  props: ['name'],
  data: function () {
    return {
      cards: 0
    }
  },
  methods: {
    deleteCard: function () {
      this.cards--;
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
</style>