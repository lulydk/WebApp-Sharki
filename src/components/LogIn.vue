<template>
    <v-container>
      <v-dialog v-model="dialog" persistent max-width="60%">
        <v-card height="90%" >
          <v-layout row class="pa-5">
            <v-flex xs12><v-img src="../assets/Sharki-Purple.png" max-width="200" class="mx-auto"></v-img></v-flex>
            <span class="sharkyPurple--text mx-auto mt-2 font-weight-bold">Iniciar sesión</span>
          </v-layout>
          <v-card flat max-width="400" class="mx-auto">
            <v-form lazy-validation>
              <v-text-field
                  v-model="first"
                  label="Usuario"
                  :rules="rules"
                  color="sharkyPurple"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  :rules="rules2"
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  color="sharkyPurple"
                  label="Contraseña"
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
            <v-card-text v-if="incorrect" class="red--text" align="center">
              Datos Incorrectos
            </v-card-text>
            <v-czard-text v-if="correct" class="green--text" align="center">
              Registro correcto! Espere mail de confirmación
            </v-czard-text>
            <div class="d-flex justify-center ">
                <v-btn class="sharkyPurple white--text" depressed large
                       @click="inicioSesion()"
                >Iniciar sesión</v-btn>
            </div>
            <div class="d-flex justify-center">
              <v-dialog v-model="dialog2" max-width="45%">
                <template v-slot:activator="{on}">
                  <v-btn text depressed small
                        color="sharkyPurple"
                        class="my-3"
                        @click="openRegister()"
                        v-on="on"
                  >¿No tenés una cuenta? Registrate
                  </v-btn>
                </template>
                <Register v-on:registerSuccess="printSuccess()"/>
              </v-dialog>
            </div>
          </v-card>
        </v-card>
        <v-spacer/>
      </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Register from "../components/Register.vue";
import { UsersApi } from "@/api";
import Vue from 'vue'

export default Vue.extend({
  name: "LogIn",
  components: {
    Register
  },
  data(){
    return {
      dialog: false,
      dialog2: false,
      show1: false,
      first: "",
      password: "",
      incorrect: false,
      correct: false,
      rules: [
        (value : String) => !!value || 'Campo obligatorio.',
        (value : String) => (value && value.length >= 3) || 'Min 3 characters',
      ],
      rules2: [
        (value : String) => !!value || 'Campo obligatorio.',
        (value : String) => (value && value.length >= 6) || 'Min 6 characters',
      ],
    }
  },
  async mounted(){
    try {
      await UsersApi.getLoggedUser();
    } catch (e) {
      this.dialog = true;
    }
  },
  methods:{
    openRegister(){
      this.dialog = false
      this.dialog2 = true
    },
    async inicioSesion(){
      try {
        await UsersApi.loginUser({
          "username": this.first,
          "password": this.password
        });
        this.dialog = false;
      } catch (e) {
        this.incorrect = true;
      }
    },
    printSuccess() {
      this.dialog = true;
      this.dialog2 = false;
      this.correct = true;
    }
  }
})
</script>

<style scoped>

</style>