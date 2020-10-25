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
                    v-on:acceptClicked="editCard($event)"
                    :exercise=exercise
                    :image=image
                    :library=library
                    modify
    />
  </v-dialog>
</template>

<script lang="ts">
import { FullExerciseImageCombo } from '@/api';
import ExerciseCard from "@/components/ExerciseCard.vue";
import ExercisePopup from "@/components/ExercisePopup.vue";
import Vue from 'vue';

export default Vue.extend({
  name: "EditableExcCard",
  components: {ExercisePopup, ExerciseCard},
  props: {
    exercise: Object,
    image: Object,
    library: Boolean,
  },
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    trashClicked: function () {
      this.$emit('trashClicked', this.exercise.id)
    },
    editCard(selected: FullExerciseImageCombo) {
      this.$emit('cardEditted', selected, this.exercise.id);
      this.dialog = false;
    }
  }
})
</script>

<style scoped>

</style>
