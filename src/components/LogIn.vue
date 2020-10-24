<template>
    <v-container>
      <v-dialog v-model="dialog" persistent max-width="60%">
        <v-card v-on="on" height="90%" >
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
            <div class="d-flex justify-center ">
                <v-btn class="sharkyPurple white--text" depressed large>Iniciar sesión</v-btn>
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
                <Register/>
              </v-dialog>
            </div>
          </v-card>
        </v-card>
        <v-spacer/>
      </v-dialog>
    </v-container>
</template>

<script>
import Register from "../components/Register.vue";

export default {
  name: "LogIn",
  components: {
    Register
  },
  data(){
    return {
      dialog: true,
      dialog2: false,
      show1: false,
      rules: [
        value => !!value || 'Campo obligatorio.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      rules2: [
        value => !!value || 'Campo obligatorio.',
        value => (value && value.length >= 6) || 'Min 6 characters',
      ],
    }
  },
  methods:{
    openRegister(){
      this.dialog = false
      this.dialog2 = true
    },
  }
}
</script>

<style scoped>

</style>