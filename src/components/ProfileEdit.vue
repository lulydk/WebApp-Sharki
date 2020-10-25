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
            <v-text-field class="px-md-16"
                          v-model="user.avatarUrl"
                          label="Link a la imagen"
            ></v-text-field>

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

        <v-overflow-btn
            v-model="user.gender"
            class="my-2 px-md-16"
            :items="generos"
            label="Género"
            item-value="text"
        ></v-overflow-btn>
          <v-spacer/>
          <div class="d-flex justify-center pa-md-4" >
            <v-btn class="pa-md-4 sharkyPurple white--text"
                   depressed large
                   @click="changeInfo(); closeEdit();"
            >
              Guardar
            </v-btn>
          </div>
          <v-spacer/>
      </v-card>
  </v-container>
</template>

<script lang="ts">

import { UsersApi, UserWithoutPassword, FullUser} from "@/api";
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileEdit',
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      generos: ['male', 'female', 'other'],
      u: {} as FullUser,
      user: {
        "username": "",
        "fullName": "",
        "gender": "other",
        "birthdate": 0,
        "email": "",
      } as UserWithoutPassword,
      rules: [
        (value: String) => !!value || 'Campo obligatorio.',
        (value: String) => (value && value.length >= 3) || 'Min 3 characters',
      ],
      menu: false
    };
  },
  methods: {
    closeEdit: function () {
      this.$emit('closeEdit');

    },
    async changeInfo () {
      try{
        this.u = await UsersApi.getLoggedUser();
        this.user.email = this.u.email;

        this.user.birthdate = new Date(this.date).getTime();
        await UsersApi.updateUser(this.user);
        this.$emit('changeInfo');


      }catch (e) {
        return '';
      }
    },
  },
})
</script>

<style scoped>

</style>