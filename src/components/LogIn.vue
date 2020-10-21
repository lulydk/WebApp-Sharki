<template>
    <v-container>
      <v-dialog v-model="dialog" max-width="45%">
        <template v-slot:activator="{on}">
          <v-btn
              color="red lighten-2"
              dark
              v-on="on"
          >
            NO SE COMO PONER PARA QUE SALTE AL INICIAR. TOCA Y MIRALO
          </v-btn>
        </template>

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
          <div class="d-flex justify-center pa-md-4" >
            <v-btn class="pa-md-4 sharkyPurple white--text" depressed large>
              Iniciar sesion
            </v-btn>
          </div>
        </v-card>
        <v-spacer/>
      </v-dialog>
    </v-container>
</template>

<script>
export default {
  name: "LogIn"
}
</script>

<style scoped>

</style>