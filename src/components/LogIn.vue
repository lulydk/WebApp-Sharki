<template>
    <v-container>
      <v-dialog v-model="dialog" persistent max-width="45%">
        <v-card v-on="on">
          <v-card-title  class="sharkyPurple white--text font-weight-bold">Inicio Sesion</v-card-title>
          <v-text-field class="pa-md-4 mx-lg-auto"
              v-model="first"
              label="Usuario"
              filled
          ></v-text-field>
          <v-text-field class="pa-md-4 mx-lg-auto"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Contraseña"
              @click:append="show1 = !show1"
          ></v-text-field>
          <div class="d-flex justify-center ">
              <v-btn class="sharkyPurple white--text" depressed large>Iniciar sesion</v-btn>
          </div>
          <div class="d-flex justify-center py-md-4">

            <v-dialog v-model="dialog2" persistent max-width="45%">
              <template v-slot:activator="{on}">
                <v-btn class="sharkyLight white--text"
                       depressed small
                       @click="openRegister()"
                       v-on="on"
                >Registrate
                </v-btn>
              </template>
              <Register  v-on:closeRegister="dialog2 = false; dialog = true"/>
            </v-dialog>
          </div>
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
      dialog2: false
    }
  },
  methods:{
    openRegister(){
      this.dialog = false
      this.dialog2 = true
    }
  }
}
</script>

<style scoped>

</style>