<template>
  <v-container mb-12 fluid>
    <v-layout class="mx-auto" row wrap>
      <LogIn/>
      <v-flex xs12 md12>
        <h2 class="mb-5">Rutinas Populares</h2>
      </v-flex>
      <v-flex class="mb-6" v-for="routine in routines" :key="routine.name">
        <RoutineCard :routine="routine"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import RoutineCard from "../components/RoutineCard";
import LogIn from "../components/LogIn";

export default {
  name: 'Home',
  components: {
    RoutineCard,
    LogIn
  },
  data () {
    return {
      routines: [
        {   image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=794&q=80',
            name: 'Rutina 1',
            id: '1',
            equipment: false,
            isPublic: true,
            rating: '3',
            difficulty: 'Facil',
            duration: '00:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'
        },
        {   image: '',
            name: 'Rutina 2',
            id: '2',
            equipment: true,
            isPublic: true,
            rating: '4',
            difficulty: 'Media',
            duration: '01:00:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 3',
            id: '3',
            equipment: false,
            isPublic: false,
            rating: '2',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 4',
            id: '4',
            equipment: false,
            isPublic: false,
            rating: '2',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 5',
            id: '5',
            equipment: false,
            isPublic: true,
            rating: '5',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
            name: 'Rutina 6',
            id: '6',
            equipment: false,
            isPublic: false,
            rating: '3',
            difficulty: 'Dificil',
            duration: '01:30:00',
            description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        }
      ]
    }
  }
}
</script>