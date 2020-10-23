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
                   src="https://runnersexperiencedotcom.files.wordpress.com/2013/12/profile.jpg"
            ></v-img>
          </v-row>
          <v-row class="flex-row align-center">
            <h1>Diego Rodriguez</h1>
            <v-spacer/>
            <v-dialog v-model="routines" max-width="80%">
              <template v-slot:activator="{on}">
                <v-btn small outlined color="sharkyPurple" v-on="on">Mis Rutinas</v-btn>
              </template>
              <Routines></Routines>
            </v-dialog>
            <v-btn depressed icon color="sharkyPurple"><v-icon>mdi-share</v-icon></v-btn>
            <v-dialog  v-model="dialog" persistent max-width="80%">
              <template v-slot:activator="{on}">
                <v-btn depressed icon color="sharkyPurple" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
              </template>
              <ProfileEdit
                  v-on:closeEdit="dialog=false"
              />
            </v-dialog>
            <v-spacer></v-spacer>

          </v-row>
          <p> <strong>Biografia: </strong> Hombre, 50 años, Argentina</p>
          <p>
            aca va toda la infor del amigo que tiene su perfil en la app alas
            no se que mas ponerle y estoy escribiendo cosas sin sentido.
            capaz tendria que poner a que se dedica y esas cosaslalsdla</p>
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

<script>
import Favorites from "@/components/Favorites.vue";
import ProfileEdit from "@/components/ProfileEdit";
import Routines from "@/components/Routines";
export default {
  name: "Profile",
  components: {
    Routines,
    ProfileEdit,
    Favorites
  },
  data(){
    return{
      dialog: false,
      routines: false
    }
  }

}
</script>

<style scoped>
  .profileBtns {
    padding: 4px;
  }
</style>