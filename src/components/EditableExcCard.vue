<!--Card que abre un popup para editarla-->
<template>
  <v-dialog v-model="dialog" max-width="60%">
    <template v-slot:activator="{}">
      <ExerciseCard
                    clearable
                    :exercise=exercise
                    :image=image
                    v-on:trashClicked="trashClicked()"
                    v-on:cardClicked="dialog=true"
      />
    </template>
    <ExercisePopup 
                   v-on:cancelClicked="dialog=false"
                   v-on:acceptClicked="dialog=false"
                   library
                   modify
    />
  </v-dialog>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";
import ExercisePopup from "@/components/ExercisePopup";

export default {
  name: "EditableExcCard",
  components: {ExercisePopup, ExerciseCard},
  props: {
    exercise: Object,
    image: Object,
  },
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked', this.exercise.id)
    }
  }
}
</script>

<style scoped>

</style>
