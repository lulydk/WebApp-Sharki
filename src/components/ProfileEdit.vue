<template>
  <v-container>
      <v-card>
        <v-card-title  class="sharkyPurple white--text font-weight-bold">
          Editar Perfil
          <v-spacer/>
          <v-btn icon @click="closeEdit()">
            <v-icon class="white--text font-weight-bold">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-row>
          <v-col class="px-md-8">
              <v-img src="https://runnersexperiencedotcom.files.wordpress.com/2013/12/profile.jpg"
                     max-width="550"
                     class=" flex align-md-center rounded-xl"
                     align="center"

              >
                <v-btn class="pa-md-4 sharkyLight white--text" depressed large>
                  <v-icon>mdi-plus</v-icon>
                  Subir Foto
                </v-btn>
              </v-img>
          </v-col>
          <!--CAMPOS PARA EDITAR PERFIL-->
          <v-col>
            <v-row>
              <v-col>
                <v-text-field class="px-md-4"
                              v-model="first"
                              :rules="rules"
                              label="Nombre"

                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field class="px-md-4"
                              v-model="first"
                              :rules="rules"
                              label="Apellido"
                ></v-text-field>
              </v-col>
            </v-row>

            <!--CALENDARIO PARA SELECCIONAR EDAD-->
            <v-menu
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
                    class="px-md-4"

                    v-model="date"
                    label="Picker in menu"
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
            <!--Biografia del usuario-->
            <v-textarea
                class="pa-md-4"
                v-model="title"
                label="Biografia"
                counter
                maxlength="200"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <div class="d-flex justify-center pa-md-4" >
            <v-btn class="pa-md-4 sharkyPurple white--text" depressed large>
              Guardar
            </v-btn>
          </div>
          <v-spacer/>
        </v-row>
      </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'ProfileEdit',
  data: () => ({
    rules: [
      value => !!value || 'Campo obligatorio.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
  methods: {
    closeEdit: function (){
      this.$emit('closeEdit');
    }
  }
}

</script>

<style scoped>

</style>