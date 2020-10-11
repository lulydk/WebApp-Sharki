<template>
  <v-card rounded="xl" class="mx-auto" max-width="400">
    <v-img height="150px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
    <v-row align="center" justify="start">
        <v-card-subtitle class="ml-3 white--text">Top 10 Australian beaches</v-card-subtitle>
        <v-spacer/>
        <v-icon class="mr-1" color="white" small>mdi-flash</v-icon>
        <span class="white--text caption mr-2">Dificultad</span>
        <v-icon class="mr-1" color="white" small>mdi-timer-outline</v-icon>
        <span class="white--text mr-7 caption">00:00</span>
    </v-row>
  </v-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .v-card {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }
</style>