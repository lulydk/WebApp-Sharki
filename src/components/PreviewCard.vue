<template>
<v-container fluid>
  <v-card rounded="xl" width="350" @click="details=!details">
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

  <RoutineDetails :routine="routine" v-model="details"/>

</v-container>
</template>

<script>
  import RoutineDetails from '@/components/RoutineDetails';
  module.exports = {
    props: {
      routine: Object,
    },
    components: {
      RoutineDetails
    },
    data () {
      return {
        details: false,
      }
    }
  }
</script>

<style scoped>
    .v-card {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }
</style>