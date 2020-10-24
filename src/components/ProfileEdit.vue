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
            <v-text-field class="px-md-4"
                          v-model="user.avatarUrl"
                          label="Link a la imagen"
            ></v-text-field>
            <v-overflow-btn
                v-model="user.gender"
                class="my-2"
                :items="generos"
                label="Género"
                item-value="text"
            ></v-overflow-btn>
          </v-col>
          <!--CAMPOS PARA EDITAR PERFIL-->
          <v-col>
              <v-text-field class="px-md-4"
                            v-model="user.username"
                            :rules="rules"
                            label="Nombre de usuario"

              ></v-text-field>
              <v-text-field class="px-md-4"
                            v-model="user.email"
                            :rules="rules"
                            label="Email"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <div class="d-flex justify-center pa-md-4" >
            <v-btn class="pa-md-4 sharkyPurple white--text"
                   depressed large
                   @click="changeInfo()"
            >
              Guardar
            </v-btn>
          </div>
          <v-spacer/>
        </v-row>
      </v-card>
  </v-container>
</template>

<script lang="ts">

import { UsersApi, UserWithoutPassword} from "@/api";
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileEdit',
  data() {
    return {
      generos: ['Masculino', 'Femenino', 'Otro'],
      user: {
        "username": "",
        "password": "",
        "fullName": "",
        "gender": "other",
        "birthdate": 0,
        "email": ""
      } as UserWithoutPassword,
      rules: [
        (value: String) => !!value || 'Campo obligatorio.',
        (value: String) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  methods: {
    closeEdit: function () {
      this.$emit('closeEdit');

    },
    async changeInfo () {
        await UsersApi.updateUser(this.user);
    },
  },
})
</script>
<style scoped>

</style>