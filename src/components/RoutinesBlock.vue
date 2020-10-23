<template>
  <div>
    <!--Headings-->
    <div class="sharkyPurple white--text">
      <v-btn depressed rounded class="sharkyPurple white--text">
        <h2>{{name}}</h2>
      </v-btn>

    </div>

    <!--Ejercicios-->
    <v-layout class="mx-auto" row wrap>
      <v-flex class="mb-6" v-for="routine in routines" :key="routine.name">
        <RoutineCard :routine="routine"/>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";
export default {
  name: "Block",
  components: {
    RoutineCard
  },
  props: ['name'],
  data () {
    return {
      routines: [
        {   image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=794&q=80',
          name: 'Rutina 1',
          equipment: '-',
          isPublic: true,
          rating: '3',
          difficulty: 'Facil',
          duration: '00:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'
        },
        {   image: '',
          name: 'Rutina 2',
          equipment: 'Pesas',
          isPublic: true,
          rating: '4',
          difficulty: 'Media',
          duration: '01:00:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {   image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
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
.repes {
  width: 50px;
}
#repes {
  width: 50px;
}
</style>