<template>
  <span class="float-right mt-1">
      <v-btn depressed
             class="mr-6 sharkyBack sharkyPurple--text custom-transform-class text-none"
             @click="cancelClicked"
      >
        Cancelar
      </v-btn>
      <v-btn depressed
             dark
             color="sharkyPurple"
             class="custom-transform-class text-none"
             @click="acceptClicked">
        Subir
      </v-btn>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "CreateButtons",
  methods: {
    acceptClicked: function () {
      this.$emit('acceptClicked');
    },
    cancelClicked: function () {
      this.$emit('cancelClicked');
    },
  }
})
</script>

<style scoped>
</style>
