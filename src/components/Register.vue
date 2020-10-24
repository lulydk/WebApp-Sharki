<template>
  <v-container>
    <v-card>
      <!--Datos para el registro-->
      <v-layout class="pa-5" row>
        <v-flex xs12>
          <v-img class="mx-auto" max-width="200" src="../assets/Sharki-Purple.png"></v-img>
        </v-flex>
        <span class="sharkyPurple--text mx-auto mt-2 font-weight-bold">Registrarse</span>
      </v-layout>
      <v-text-field v-model="input.username"
                    :rules="rules2"
                    class="px-md-4 pt-md-4 mx-lg-auto"
                    color="sharkyPurple"
                    label="Usuario"
      ></v-text-field>
      <v-text-field v-model="input.fullName"
                    :rules="rules"
                    class="px-md-4 mx-lg-auto"
                    label="Nombre completo"
      ></v-text-field>
      <v-text-field v-model="input.email"
                    :rules="emailRules"
                    class="pa-md-4 mx-lg-auto"
                    color="sharkyPurple"
                    label="Mail"
      ></v-text-field>

      <v-text-field v-model="input.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules2"
                    :type="show1 ? 'text' : 'password'"
                    class="px-md-4 mx-lg-auto"
                    color="sharkyPurple"
                    label="Contraseña"
                    @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field v-model="passwordRep"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules2"
                    :type="show1 ? 'text' : 'password'"
                    class="px-md-4 mx-lg-auto"
                    color="sharkyPurple"
                    label="Repetir contraseña"
                    @click:append="show1 = !show1"
      ></v-text-field>

      <v-card-text v-if="incorrectData" class="red--text" align="center">
        Error en los datos
      </v-card-text>
      <v-card-text v-if="incorrectPass" class="red--text" align="center">
        Las contraseñas no son iguales
      </v-card-text>

      <div class="d-flex justify-center pa-md-4">
        <v-btn class="pa-md-4 sharkyPurple white--text"
               depressed large
               @click="tryRegister()"
        >
          Registrarse
        </v-btn>
      </div>
    </v-card>
  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import {User, UsersApi} from "@/api";

export default Vue.extend({
  name: "Register",
  data() {
    return {
      show1: false,
      incorrectData: false,
      incorrectPass: false,
      rules: [
        (value: String) => !!value || 'Campo obligatorio.',
        (value: String) => (value && value.length >= 3) || 'Min 3 characters',
      ],
      rules2: [
        (value: String) => !!value || 'Campo obligatorio.',
        (value: String) => (value && value.length >= 6) || 'Min 6 characters',
      ],
      emailRules: [
        (value: String) => !!value || 'E-mail is required',
        (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],
      input: {
        "username": "",
        "password": "",
        "fullName": "",
        "gender": "other",
        "birthdate": 0,
        "email": ""
      } as User,
      passwordRep: "" as string
    }
  },
  methods: {
    async tryRegister(){
      this.incorrectPass = false;
      this.incorrectData = false;
      if(this.input.password == this.passwordRep){
        try {
          await UsersApi.createUser(this.input)
          this.$emit('registerSuccess');
        } catch (e) {
          this.incorrectData = true;
        }
      } else {
        this.incorrectPass = true;
      }
    }
  }
})
</script>

<style scoped>

</style>