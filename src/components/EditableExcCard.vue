<!--Card que abre un popup para editarla-->
<template>
  <v-dialog v-model="dialog" max-width="60%">
    <template v-slot:activator="{}">
      <ExerciseCard
                    clearable
                    :exercise=exercise
                    :exercises_db=exercises_db
                    :images_db=images_db
                    v-on:trashClicked="trashClicked()"
                    v-on:cardClicked="dialog=true"
      />
    </template>
    <ExercisePopup :current_exercise=exercise
                   :current_image=getImage(exercise.id)
                   :exercise_db=exercises_db
                   :images_db=images_db
                   v-on:cancelClicked="dialog=false"
                   v-on:acceptClicked="dialog=false"
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
    exercises_db: Array,
    images_db: Array,
  },
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    //  Devuelve la imagen correspondiente al ejercicio
    getImage: function (id) {
      return this.images_db.find(im => im.id === id);
    },
    trashClicked: function () {
      this.dialog = false;
      this.$emit('trashClicked', this.exercise.id)
    }
  }
}
</script>

<style scoped>

</style>
