<template>
  <v-container mb-12 fluid>
    <v-layout id="cards" class="mx-auto" row wrap>
      <v-flex xs12 md12>
        <h2 class="mb-5">Rutinas Populares</h2>
      </v-flex>
      <v-flex class="mb-6" v-for="routine in routines" :key="routine.name">
            <PreviewCard :routine="routine"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import PreviewCard from "../components/PreviewCard";

export default {
  name: 'Home',
  components: {
    PreviewCard
  },
  data () {
    return {
      routines: [
        {   image: '',
            name: 'Rutina 1',
            difficulty: 'Facil',
            duration: '00:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 2',
            difficulty: 'Media',
            duration: '01:00:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 3',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 3',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 3',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 3',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #cards {
    border: 3px solid red;
  }
</style>