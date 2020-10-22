<template>
  <v-card width="300px" height="150px" rounded="xl" class="sharkyPurple">
    <v-img
        :src=image.url
        height="100px"
    />
    <div class="white--text">
      <v-card-title class="d-inline-block pa-3 text-lg-body-1">
        {{ exercise.name + getExerciseCount()}}
      </v-card-title>
      <v-card-actions class="d-inline-block float-right pt-1">
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
    image: Object
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
        return " - " + this.exercise.duration + " segundos";
      }
      return "";
    }
  }
}
</script>

<style scoped>

</style>