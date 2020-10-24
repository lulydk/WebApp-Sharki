<template>
  <v-container fluid pa-0>
    <v-app-bar app flat dark class="hidden-sm-and-down">
      <v-app-bar-nav-icon class="ml-10 pl-10">
          <router-link to="/">
            <v-img contain height="25" class="mr-10" src="../assets/Sharki-White.png"/>
          </router-link>
      </v-app-bar-nav-icon>
      <v-spacer/>
      <v-col cols="10">
        <v-toolbar-items>
          <v-row dense align="center" justify="end">
            <v-text-field filled dense clearable shaped class="mt-6 mr-6 font-weight-regular rounded-lg" placeholder="Busca rutinas y entrenadores" append-icon="mdi-magnify" @click:append="search"></v-text-field>
            <v-btn outlined class="menuBtn mr-6 custom-transform-class text-none font-weight-bold rounded-lg" v-for="item in barItems" :key="item.title" :to="`${item.link}`">{{item.title}}</v-btn>
            <v-menu flat rounded="lg" offset-y nudge-bottom="5">
              <template v-slot:activator="{ on, attrs }">
                <v-btn depressed fab small color="white" v-bind="attrs" v-on="on"><v-icon color="#9752ff">mdi-account</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in accItems" :key="i">
                  <v-btn :class="`custom-transform-class text-none ${item.mode} font-weight-medium rounded-lg`" block depressed :color="item.color" item.mode :to="`${item.link}`" >{{ item.title }}</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-toolbar-items>
      </v-col>
    </v-app-bar>

    <v-app-bar flat app dark class="hidden-md-and-up">
        <v-app-bar-nav-icon class="pl-5 mx-10">
          <router-link to="/">
            <v-img contain height="25" class="mr-10" src="../assets/Sharki-White.png"/>
          </router-link>
        </v-app-bar-nav-icon>
        <v-spacer/>
        <v-text-field filled dense clearable shaped class="mt-6 font-weight-regular rounded-lg" placeholder="Busca rutinas y entrenadores" append-icon="mdi-magnify" @click:append="search"></v-text-field>
        <v-app-bar-nav-icon @click.stop="navDraw=!navDraw;"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer dark hide-overlay right color="#5a00e0" app v-model="navDraw" class="hidden-md-and-up">
      <v-list dense nav>
        <v-list-item v-for="item in barItems" :key="item.title" link :to="item.link">
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content @click="navBar=false;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Mi cuenta</v-subheader>
      <v-list dense nav>
        <v-list-item v-for="item in accItems" :key="item.title" link :to="item.link">
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content color="white">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-container>
</template>

<script>
export default {
  name: "Navbar",
  data () {
    return {
      dialog: false,
      navDraw: false,
      barItems: [
        { title: 'Rutinas', link: '/explore/0', icon: 'mdi-compass-outline'},
        { title: 'Crear una rutina', link: '/create/0', icon: 'mdi-plus-circle-multiple-outline'}
      ],
      accItems: [
        { title: 'Mi perfil', link: '/profile', color: '#eee5fc', icon: 'mdi-account'},
        { title: 'Rutinas creadas', link: '/routines', color: '#eee5fc', icon: 'mdi-timer-outline'},
        { title: 'Ejercicios creados', link: '/library', color: '#eee5fc', icon: 'mdi-dumbbell'},
        { title: 'Cerrar sesión', link:'/close', color: '#5a00e0', mode:'white--text', icon: 'mdi-logout-variant'}
      ]
    }
  },
  methods: {
    search () {
      return null;
    }
  }
}
</script>

<style scoped>

  .v-toolbar {
    background-image: linear-gradient(to right, #5a00e0, #9752ff);
  }
  
  .menuBtn {
    border: 2px solid; 
  }

</style>