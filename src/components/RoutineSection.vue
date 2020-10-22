<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text">
      <h3 class="d-inline-block ml-3">Nombre:</h3>
      <v-text-field v-model="cycle.name"
                    class="pa-4 d-inline-block mb-0 my-text-style"
                    flat
                    hide-details
                    outlined
                    clearable
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
      <v-slide-item v-for="n in cards" :key="n">
        <ExerciseCard class="ma-4"
                      v-on:trashClicked="deleteCard"/>
      </v-slide-item>
      <v-slide-item>
        <v-btn id="agregar" class="ma-4 sharkyPurple--text"
               outlined
               @click="cards++">
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
      cards: 0
    }
  },
  methods: {
    deleteCard: function () {
      this.cards--;
    },
    trashClicked: function () {
      this.$emit('trashClicked', this.cycle.id)
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