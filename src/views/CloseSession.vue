<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="60%" persistent>
      <template v-slot:activator="{}">
      </template>
      <v-card>
        <h1 v-if="success" class="sharkyPurple--text">Ha cerrado sesión</h1>
        <h1 v-if="error" class="red--text">No se ha podido cerrar la sesión</h1>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {UsersApi} from "@/api";

export default Vue.extend({
  name: "CloseSession",
  mounted() {
    try {
      UsersApi.logoutUser()
      this.success = true;
    } catch (e) {
      this.error = true;
    }
  },
  data() {
    return {
      success: false,
      error: false,
      dialog: true
    }
  }
})
</script>

<style scoped>

</style>