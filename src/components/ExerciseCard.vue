<template>
  <v-card width="300px" height="150px" rounded="xl" class="sharkyPurple">
    <v-img
        src="https://www.t-nation.com/system/publishing/articles/10001096/original/Unconventional-Workout-Abs.jpg?1515713332"
        height="100px"
    />
    <div class="white--text">
      <v-card-title class="d-inline-block pa-3 text-lg-body-1">Ejercicio i</v-card-title>
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
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked')
    }
  }
}
</script>

<style scoped>

</style>