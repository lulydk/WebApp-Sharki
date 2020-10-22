<template>
  <v-card width="300px" height="150px" rounded="xl" class="sharkyPurple">
    <v-img
        :src=getImage(exercise.id).url
        height="100px"
    />
    <div class="white--text">
      <v-card-title class="d-inline-block pa-3 text-lg-body-1">
        {{ exercise.name + getExerciseCount()}}
      </v-card-title>
      <v-card-actions v-if=clearable
          class="d-inline-block float-right pt-1"
      >
        <v-btn icon
          @click="trashClicked">
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    exercise: Object,
    exercises_db: Array,
    images_db: Array,
    clearable: Boolean
  },
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked', this.exercise.id)
    },
    getExerciseCount: function () {
      if(this.exercise.repetitions !== 0) {
        return " - " + this.exercise.repetitions + " veces";
      }
      if(this.exercise.duration !== 0) {
        //Ver de convertir segundos a minutos según sea necesario
        return " - " + this.exercise.duration + " segundos";
      }
      return "";
    },
    //  Devuelve la imagen correspondiente al ejercicio
    getImage: function (id) {
      return this.images_db.find(im => im.id === id);
    }
  }
}
</script>

<style scoped>

</style>