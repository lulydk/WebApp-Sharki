<template>
    <v-card flat class="mx-auto pa-5">
        <h1 class="d-inline-block ml-4 sharkyPurple--text">
          <v-icon class="pb-1" color="sharkyPurple" large>mdi-mail</v-icon>
          Contactanos
        </h1>
        <v-card-text v-for="i in integrantes" :key="i.name">
          <h3>{{ i.name }}</h3>
          <h5>{{ i.mail }}</h5>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Contact',
    data () {
      return {
        integrantes: [
          { name:'Colonello, Joaquín Román', mail:'jcolonello@itba.edu.ar'},
          { name:'Diaz Kralj, Luciana', mail:'lucidiaz@itba.edu.ar'},
          { name:'Gomez, Lucas Sebastian', mail:'lugomez@itba.edu.ar'},
          { name:'Parma, Manuel Félix', mail:'mparma@itba.edu.ar'}
        ]
      }
    }
  }
</script>