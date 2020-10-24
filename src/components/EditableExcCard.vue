<!--Card que abre un popup para editarla-->
<template>
  <v-dialog v-model="dialog" max-width="60%">
    <template v-slot:activator="{}">
      <ExerciseCard
          :exercise=exercise
          :image=image
          clearable
          v-on:cardClicked="dialog=true"
          v-on:trashClicked="trashClicked()"
      />
    </template>
    <ExercisePopup
        :exercise=exercise
        :image=image
        library
        modify
        v-on:acceptClicked="dialog=false"
        v-on:cancelClicked="dialog=false"
    />
  </v-dialog>
</template>

<script lang="ts">
import ExerciseCard from "@/components/ExerciseCard.vue";
import ExercisePopup from "@/components/ExercisePopup.vue";
import Vue from 'vue';

export default Vue.extend({
  name: "EditableExcCard",
  components: {ExercisePopup, ExerciseCard},
  props: {
    exercise: Object,
    image: Object,
  },
  data: function () {
    return {
      dialog: false,
    }
  },
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked', this.exercise.id)
    }
  }
})
</script>

<style scoped>

</style>
