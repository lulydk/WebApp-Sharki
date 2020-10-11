<template>

  <div class="profile">
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <h1>
              <v-icon>person</v-icon>Mi Perfil
            </h1>
          </v-row>
          <v-row>
            <v-img max-width="500px" max-height="250px"  class="rounded-xl"
                   src="https://runnersexperiencedotcom.files.wordpress.com/2013/12/profile.jpg"
            ></v-img>
          </v-row>
          <v-row>
            <v-col cols="6"><h1>Diego Rodriguez</h1></v-col>
            <v-col><v-btn><v-icon>share</v-icon></v-btn></v-col>
            <v-col><v-btn><v-icon>create</v-icon></v-btn></v-col>
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
            <v-row >
              <v-col cols="2">
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Peso</v-btn>
              </v-col>
              <v-col>
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Ejercicios por dia</v-btn>
              </v-col>
              <v-col>
                <v-btn
                    class="sharkyPurple--text"
                    elevation="2"
                    small
                >Calorias Consumidas</v-btn>
              </v-col>
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
