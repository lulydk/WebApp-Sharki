<template>
  <v-container>
      <v-card>
        <!--Datos para el registro-->
        <v-card-title  class="sharkyPurple white--text font-weight-bold">Registro</v-card-title>
        <v-row>
          <v-col>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Nombre"
            ></v-text-field>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Apellido"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Mail"
            ></v-text-field>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules2"
                          label="Usuario"
            ></v-text-field>
          </v-col>
        </v-row>



        <v-text-field class="pa-md-4 mx-lg-auto"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      :rules="rules2"
                      label="Contraseña"
                      @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field class="pa-md-4 mx-lg-auto"
                                      v-model="password"
                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show1 ? 'text' : 'password'"
                                      :rules="rules2"
                                      label="Repetir contraseña"
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
  props:{

  }
}
</script>

<style scoped>

</style>