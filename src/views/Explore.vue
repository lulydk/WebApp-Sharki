<template>
  <div>
    <div>
      <h1 class="mx-8 mb-4">
        <v-icon class="icon" size=33px>mdi-compass-outline</v-icon>
        Explorar Rutinas
      </h1>
    </div>
    <div class="search-options">
      <v-container>
        <v-row>
          <!--v-col class="d-flex flex-column">
              <span>
                <v-icon>mdi-menu-down</v-icon>
                Búsqueda avanzada
              </span>
              <v-textarea class="search-text"
                rows=2
                color="sharkyPurple"
                background-color="white"
                outlined
                no-resize
                hint="Ej.: Cardio, piernas"
              ></v-textarea>
              <v-textarea class="search-text"
                rows=1
                color="sharkyPurple"
                background-color="white"
                outlined
                no-resize
                hint="Ej.: En casa, bicicleta"
              ></v-textarea>
          </v-col-->
          <!--v-col>
            Duración
          </v-col-->
          <!--v-col class="d-flex flex-column">
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
          </v-col-->
          <!--v-col>
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
          </v-col-->

          <v-col>
            <!--Lista de Categorias-->
            <div>
              <h3 class="d-inline-block ml-5 mt-6 sharkyPurple--text">
                Categoría de la rutina:
              </h3>
              <v-overflow-btn
                  id="categoryBar"
                  v-model="category"
                  :items="categorias"
                  class="ml-5 categoryBar d-inline-block"
                  filled
                  hide-details
                  label="Seleccionar"
              />
            </div>
          </v-col>
          <v-col>
            <!--Lista de dificultad-->
            <div>
              <h3 class="d-inline-block ml-5 mt-6 sharkyPurple--text">
                Dificultad de la rutina:
              </h3>
              <v-overflow-btn
                  id="categoryBar"
                  v-model="dificulty"
                  :items="dificultades"
                  class="ml-5 categoryBar d-inline-block"
                  filled
                  hide-details
                  label="Seleccionar"
              />
            </div>
          </v-col>

        </v-row>
      </v-container>
    </div>
    <v-layout class="mx-auto" row wrap>

      <v-flex v-for="routine in routines" :key="routine.name" class="mb-6">
        <RoutineCard :routine="routine"/>
      </v-flex>
    </v-layout>

    <!--Popup cuando se llegó a la pagina por compartir una rutina-->
    <v-dialog v-if="id!=='0'" v-model="dialog" max-width="800">
      <template/>
      <!-- Cambiar para que Routine Popup reciba sólo la info/id de la rutina-->
      <RoutinePopup :routine_id=+id
                    v-on:closePop="dialog=false"
      />
    </v-dialog>

  </div>
</template>

<script lang="ts">
import RoutineCard from "@/components/RoutineCard.vue";
import RoutinePopup from "@/components/RoutinePopup.vue";
import Vue from 'vue';
import {CategoriesApi, Routine} from "@/api";

export default Vue.extend({
  name: "Explore",
  components: {
    RoutinePopup,
    RoutineCard
  },
  props: {id: String},
  async mounted(){
    this.categorias = (await CategoriesApi.findCategories()).results.map(cat => cat.name);
  },
  data() {
    return {
      dialog: true,
      category: "",
      dificulty: "",
      dificultades: Object.keys(Routine.DifficultyEnum),
      categorias: [] as string[],
      //Datos de prueba
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
})
</script>

<style scoped>
h1 {
  color: var(--v-sharkyPurple-base);
}

.icon {
  color: var(--v-sharkyPurple-base);
}

.search-options {
  background-color: var(--v-sharkyBack-base);
}

.categoryBar {
  width: 50%;
}

#categoryBar {
  width: 50%;
}
</style>