<template>
<v-container fluid>

  <v-dialog v-model="dialog">
    <template v-slot:activator="{on}">
      <v-card id="preview" v-on="on" rounded="xl" width="350">
        <v-img height="150px" :src="routine.image"></v-img>
        <v-row align="center" justify="start">
            <v-card-subtitle class="ml-3 white--text">{{ routine.name }}</v-card-subtitle>
            <v-spacer/>
            <v-icon class="mr-1" color="white" small>mdi-flash</v-icon>
            <span class="white--text caption mr-2">{{ routine.difficulty }}</span>
            <v-icon class="mr-1" color="white" small>mdi-timer-outline</v-icon>
            <span class="white--text mr-7 caption">{{ routine.duration }}</span>
        </v-row>
      </v-card>
    </template>
    
    <v-card height="1000" width="1000">
        <v-card-title>{{ routine.name }}</v-card-title>
        <v-card-subtitle>
          <v-list>
            <v-list-item-subtitle><v-icon small>mdi-flash</v-icon> Dificultad: {{ routine.difficulty }}</v-list-item-subtitle>

            <v-list-item-subtitle><v-icon small>mdi-timer-outline</v-icon> Duracion: {{ routine.duration }}</v-list-item-subtitle>
          </v-list>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
    </v-card>

  </v-dialog>

</v-container>
</template>

<script>
  module.exports = {
    props: {
      routine: Object,
    },
    data () {
      return {
        dialog: false,
      }
    }
  }
</script>

<style scoped>
    #preview {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }
</style>