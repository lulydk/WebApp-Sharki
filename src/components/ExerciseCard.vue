<template>
  <v-card class="sharkyPurple my-4 mx-2"
          height="150px"
          rounded="xl"
          width="300px"
          @click="cardClicked"
  >
    <v-img
        :src=getImage()
        height="100px"
    />
    <div class="white--text">
      <v-card-title class="d-inline-block pa-3 text-lg-body-1"
      >
        {{ exercise.name + getExerciseCount() }}
      </v-card-title>
      <v-card-actions v-if=clearable
                      class="d-inline-block float-right pt-1"
      >
        <v-btn icon
               @click.stop="trashClicked">
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
    image: Object,
    clearable: Boolean,
    index: Number
  },
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked')
    },
    cardClicked: function () {
      this.$emit('cardClicked', this.index)
    },
    getExerciseCount: function () {
      if (this.exercise.repetitions !== 0) {
        return " - " + this.exercise.repetitions + " veces";
      }
      if (this.exercise.duration !== 0) {
        //Ver de convertir segundos a minutos según sea necesario
        return " - " + this.exercise.duration + " segundos";
      }
      return "";
    },
    getImage() {
      return this.image?.url ?? "";
    }
  }
}
</script>

<style scoped>

</style>