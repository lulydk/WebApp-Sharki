<template>
  <v-container>
      <v-card>
        <!--Datos para el registro-->
        <v-layout row class="pa-5">
            <v-flex xs12><v-img src="../assets/Sharki-Purple.png" max-width="200" class="mx-auto"></v-img></v-flex>
            <span class="sharkyPurple--text mx-auto mt-2 font-weight-bold">Registrarse</span>
          </v-layout>
        <v-row>
          <v-col>
            <v-text-field class="px-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Nombre"
            ></v-text-field>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="emailRules"
                          label="Mail"
                          color="sharkyPurple"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="px-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Apellido"
            ></v-text-field>
            <v-text-field class="px-md-4 pt-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules2"
                          label="Usuario"
                          color="sharkyPurple"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field class="px-md-4 mx-lg-auto"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      :rules="rules2"
                      label="Contraseña"
                      color="sharkyPurple"
                      @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field class="px-md-4 mx-lg-auto"
                                      v-model="password"
                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show1 ? 'text' : 'password'"
                                      :rules="rules2"
                                      label="Repetir contraseña"
                                      color="sharkyPurple"
                                      @click:append="show1 = !show1"
      ></v-text-field>
        <div class="d-flex justify-center pa-md-4" >
          <v-btn class="pa-md-4 sharkyPurple white--text" depressed large>
            Registrarse
          </v-btn>
        </div>
      </v-card>
  </v-container>

</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      show1: false,
      rules: [
        value => !!value || 'Campo obligatorio.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      rules2: [
        value => !!value || 'Campo obligatorio.',
        value => (value && value.length >= 6) || 'Min 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  props:{

  }
}
</script>

<style scoped>

</style>