<template>
  <div class="profile">
    <v-container>
      <v-row>
        <h1 class="sharkyPurple--text">
          <v-icon color="sharkyPurple">mdi-account</v-icon> Mi Perfil
        </h1>
      </v-row>
      <v-row>
        <v-col>
          <v-row>

            <v-img max-width="500px" max-height="250px"  class="rounded-xl"
                   :src="user.avatarUrl"
            ></v-img>
          </v-row>
          <v-row class="flex-row align-center">
            <h1>{{  user.username }}</h1>
            <v-spacer/>
                <v-btn small outlined color="sharkyPurple" :to="'/routines'">Mis Rutinas</v-btn>
            <v-btn depressed icon color="sharkyPurple"><v-icon>mdi-share</v-icon></v-btn>
            <v-dialog  v-model="dialog" persistent max-width="80%">
              <template v-slot:activator="{on}">
                <v-btn depressed icon color="sharkyPurple" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
              </template>
              <ProfileEdit
                  v-on:closeEdit="dialog=false"
                  v-on:changeInfo="update();"
              />
            </v-dialog>
            <v-spacer></v-spacer>
          </v-row>
          <p> <strong>Informacion: </strong> {{ user.gender }}, {{user.birthdate}} años</p>
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzMeHgrzEr_9A-KwQyktlpd9HIuMGJFEn5xg&usqp=CAU"></v-img>
            </v-row>

            <v-row class="flex-row justify-center">
              <v-spacer></v-spacer>
              <v-btn class="sharkyPurple white--text" depressed small>Peso</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="sharkyPurple white--text" depressed small>Ejercicios por dia</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="sharkyPurple white--text" depressed small>Calorias Consumidas</v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
          <Favorites class="my-8 mt-0"></Favorites>
    </v-container>
  </div>
</template>


<script lang="ts">
import Favorites from "@/components/Favorites.vue";
import ProfileEdit from "@/components/ProfileEdit.vue";
import Vue from  "vue";
import {UsersApi, FullUser} from "@/api";

export default Vue.extend({
  name: "Profile",

  components: {
    ProfileEdit,
    Favorites
  },
  data(){
    return{
      user: {} as FullUser,
      dialog: false,
      routines: false,
    }
  },
  async mounted(){
    this.user = (await UsersApi.getLoggedUser());
  },
  methods: {
    update: async function (){
      this.user = await UsersApi.getLoggedUser();
    },


  }

})
</script>
<style scoped>
  .profileBtns {
    padding: 4px;
  }
</style>