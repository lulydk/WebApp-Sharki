<template>
  <v-dialog persistent v-model="dialog" max-width="60%">
    <template v-slot:activator="{}">
    </template>
    <v-card>
      <v-card-title class="sharkyPurple--text">Verificación</v-card-title>
      <v-container>
      <v-text-field v-model="email"
                    label="email"
      />
      <v-text-field v-model="code"
                    label="codigo"
      />
      <v-btn v-if="!correct" @click="verify()">Aceptar</v-btn>
        <v-card-text v-if="correct" class="green--text">Verificación correcta! Ahora puede loguearse en la página principal</v-card-text>
        <v-btn v-if="correct" :to="'/'">Home</v-btn>
        <v-card-text v-if="incorrect" class="red--text">Verificación incorrecta! Intente de nuevo</v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {UsersApi} from "@/api";

export default Vue.extend({
  name: "Verification",
  props: {code: String},
  data() {
    return {
      email: "" as string,
      dialog: true as boolean,
      correct: false as boolean,
      incorrect: false as boolean
    }
  },
  methods: {
    async verify() {
      try {
        await UsersApi.verifyUserEmail({'email': this.email, 'code': this.code});
        this.correct = true;
      } catch (e) {
        this.incorrect = true;
      }
    }
  }
})
</script>

<style scoped>

</style>