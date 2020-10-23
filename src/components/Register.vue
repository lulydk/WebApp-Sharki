<template>
  <v-container>
      <v-card>
        <!--Datos para el registro-->
        <v-card-title  class="sharkyPurple white--text font-weight-bold">
          Registro
          <v-spacer/>
          <v-btn icon @click="closeRegister()">
            <v-icon class="white--text font-weight-bold">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-row>
          <v-col>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Nombre"
            ></v-text-field>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules2"
                          label="Usuario"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Apellido"
            ></v-text-field>
            <v-text-field class="pa-md-4 mx-lg-auto"
                          v-model="first"
                          :rules="rules"
                          label="Mail"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu
                class="pa-md-4 mx-lg-auto"
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    class="pa-md-4 mx-lg-auto"
                    v-model="date"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-overflow-btn
                class="my-2"
                :items="generos"
                label="Género"
                item-value="text"
            ></v-overflow-btn>
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
      generos: ['Masculino', 'Femenino', 'Otro'],
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
  methods: {
    closeRegister: function (){
      this.$emit('closeRegister');
    }
  }
}
</script>

<style scoped>

</style>