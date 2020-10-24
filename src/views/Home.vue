<template>
  <div>
    <LogIn/>
    <div class="create mx-8 mb-4">
      <!--Heading-->
      <div class="mb-4">
        <h1 class="d-inline-block sharkyPurple--text">
          <v-icon class="pb-2 sharkyPurple--text" large>mdi-home</v-icon>
          Bienvenido, user
        </h1>
      </div>
      <Carousel :routines=routines />
      <v-flex v-for="cat in categories" :key="cat.id" class="mt-5">
        <h3 class="d-inline-block mb-3">Categoría: {{ cat.name }}</h3>
        <v-slide-group show-arrows class="sharkyBack py-2">
          <!--CAMBIAR ROUTINES POR LAS RUTINAS DE CIERTA CATEGORIA-->
          <v-slide-item v-for="r in routines" :key="r.id">
            <RoutineCard :routine="r"/>
          </v-slide-item>
        </v-slide-group>
      </v-flex>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import RoutineCard from "../components/RoutineCard";
  import LogIn from "../components/LogIn";
  import Carousel from "../components/Carousel";

export default {
  name: 'Home',
  components: {
    RoutineCard,
    LogIn,
    Carousel
  },
  data () {
    return {
      categories: [
        { name:'Yoga', id:1 },
        { name:'Musculacion', id:2 },
        { name:'Cardio', id:3 } 
      ],
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