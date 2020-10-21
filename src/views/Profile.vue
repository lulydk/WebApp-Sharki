<template>

  <div class="profile">
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <h1>
              <v-icon>mdi-human</v-icon>Mi Perfil
            </h1>
          </v-row>
          <v-row>
            <v-img max-width="500px" max-height="250px"  class="rounded-xl"
                   src="https://runnersexperiencedotcom.files.wordpress.com/2013/12/profile.jpg"
            ></v-img>
          </v-row>
          <v-row class="flex-row align-center">
            <h1>Diego Rodriguez</h1>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon>mdi-share</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
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
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Peso</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Ejercicios por dia</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Calorias Consumidas</v-btn>
                <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <v-footer
          absolute
          color='sharkyPurple'
      >
        <v-col>
          Copyright
        </v-col>
        <v-col>
          Terminos y condiciones
        </v-col>
        <v-col>
          Preguntas Frecuentes
        </v-col>
      </v-footer>
    </v-container>

  </div>
</template>
