<template>
  <div>
    <div>
      <h1 class="ma-2">
        <v-icon class="icon" size=33px>mdi-compass-outline</v-icon>
        Explorar
      </h1>
    </div>
    <div class="search-options">
      <v-container>
        <v-row>
          <v-col class="d-flex flex-column">
							<span>
								<v-icon>mdi-menu-down</v-icon>
								Búsqueda avanzada
							</span>
            <v-textarea background-color="white"
                        class="search-text"
                        color="sharkyPurple"
                        hint="Ej.: Cardio, piernas"
                        no-resize
                        outlined
                        rows=2
            ></v-textarea>
            <v-textarea background-color="white"
                        class="search-text"
                        color="sharkyPurple"
                        hint="Ej.: En casa, bicicleta"
                        no-resize
                        outlined
                        rows=1
            ></v-textarea>
          </v-col>
          <v-col>
            Duración
          </v-col>
          <v-col class="d-flex flex-column">
            Equipamiento
            <v-checkbox
                label="Sin equipamiento"
            ></v-checkbox>
            <v-checkbox
                label="Colchoneta"
            ></v-checkbox>
            <v-checkbox
                label="Elemento 2"
            ></v-checkbox>
          </v-col>
          <v-col>
            Dificultad
            <v-checkbox
                label="Fácil"
            ></v-checkbox>
            <v-checkbox
                label="Medio"
            ></v-checkbox>
            <v-checkbox
                label="Difícil"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-layout class="mx-auto" row wrap>
      <v-flex md12 xs12>
        <h2 class="ma-5">Rutinas</h2>
      </v-flex>
      <v-flex v-for="routine in routines" :key="routine.name" class="mb-6">
        <RoutineCard :routine="routine" :routine_id=routine.id />
      </v-flex>
    </v-layout>
    <v-dialog v-if="id!=0" v-model="dialog" max-width="800">
      <template/>
      <!-- Cambiar para que Routine Popup reciba sólo la info/id de la rutina-->
      <RoutinePopup :routine_id=id
                    :cycles=cycles
                    :exercises=exercises
                    :routine="routines.find(e => e.id == id)"
                    v-on:closePop="dialog=false"
      />
    </v-dialog>
  </div>
</template>

<script>
import RoutineCard from "@/components/RoutineCard.vue";
import RoutinePopup from "@/components/RoutinePopup";

export default {
  name: "Explore",
  components: {
    RoutinePopup,
    RoutineCard
  },
  props: {id: Number},
  data() {
    return {
      dialog: true,
      routines: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=794&q=80',
          name: 'Rutina 1',
          equipment: '-',
          isPublic: true,
          rating: '3',
          difficulty: 'Facil',
          duration: '00:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'
        },
        {
          id: 2,
          image: '',
          name: 'Rutina 2',
          equipment: 'Pesas',
          isPublic: true,
          rating: '4',
          difficulty: 'Media',
          duration: '01:00:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          id: 3,
          image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          id: 4,
          image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          id: 5,
          image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          id: 6,
          image: '',
          name: 'Rutina 3',
          equipment: '-',
          isPublic: false,
          rating: '2',
          difficulty: 'Dificil',
          duration: '01:30:00',
          description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
      ],
      cycles: [
        {name: 'Warmup', id: '1', repetitions: 1},
        {name: 'Exercises', id: '2', repetitions: 2},
        {name: 'Cooldown', id: '3', repetitions: 1}
      ],
      exercises: [
        {
          name: 'Ejercicio 1',
          id: '1',
          repetitions: 0,
          duration: 30,
          img: 'https://images.unsplash.com/flagged/photo-1573556291531-a5d957d7e4e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
          detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'
        },
        {
          name: 'Ejercicio 2',
          id: '2',
          repetitions: 2,
          duration: 0,
          detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          name: 'Ejercicio 3',
          id: '3',
          repetitions: 0,
          duration: 15,
          detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          name: 'Ejercicio 5',
          id: '5',
          repetitions: 0,
          duration: 20,
          detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        },
        {
          name: 'Ejercicio 6',
          id: '6',
          repetitions: 1,
          duration: 0,
          detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
        }
      ]
    }
  }
}

</script>

<style scoped>
h1 {
  color: var(--v-sharkyPurple-base);
}

.icon {
  color: var(--v-sharkyLight-base);
}

.search-options {
  background-color: var(--v-sharkyBack-base);
}
</style>