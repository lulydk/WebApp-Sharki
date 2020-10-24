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
                  :items="categories"
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
        <v-row>
          <v-col>
            <v-spacer/>
          </v-col>
          <v-col>
            <v-spacer/>
          </v-col>
          <v-col>
            <v-spacer/>
          </v-col>
          <v-col>
            <v-spacer/>
          </v-col>
          <v-col>
            <v-btn color="sharkyPurple"
                   dark
                   depressed
                   x-large
                   @click="searchClicked"
            >
              Buscar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <h1 v-if="!loaded" align="center">
      <v-progress-circular
          color="sharkyPurple"
          indeterminate
      ></v-progress-circular>
    </h1>

    <h4 v-if="error" align="center" class="red--text">
      NO SE HAN PODIDO CARGAR LAS RUTINAS
    </h4>

    <v-layout v-if="loaded" class="mx-auto" row wrap>
      <v-flex v-for="routine in resultRoutines" :key="routine.id" class="mb-6 ml-15">
        <RoutineCard
            :routine="routine"
            :routine_id=routine.id
        />
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
import {CategoriesApi, FullRoutine, Routine, RoutinesApi} from "@/api";
import DifficultyEnum = FullRoutine.DifficultyEnum;

export default Vue.extend({
  name: "Explore",
  components: {
    RoutinePopup,
    RoutineCard
  },
  props: {id: String},
  async mounted() {
    try {
      this.categories = (await CategoriesApi.findCategories(0, 100)).results.map(cat => cat.name);
      this.resultRoutines = (await RoutinesApi.findRoutines(undefined, undefined, 0, 100))
          .results.filter(routine => routine.isPublic);
      this.loaded = true;
    } catch (e) {
      console.log('ERROR AL CARGAR RUTINAS');
    }
  },
  data() {
    return {
      dialog: true,
      error: false,
      category: "" as string,
      dificulty: undefined as DifficultyEnum | undefined,
      dificultades: Object.values(Routine.DifficultyEnum),
      categories: [] as string[],
      resultRoutines: [] as FullRoutine[],
      loaded: false
    }
  },
  methods: {
    async searchClicked() {
      this.loaded = false;
      try {
        this.resultRoutines = (await RoutinesApi.findRoutines(undefined, this.dificulty, 0, 100))
            .results.filter(routine => routine.isPublic);
        if (this.category != "")
          this.resultRoutines = this.resultRoutines.filter(routine => routine.category.name == this.category);
        this.loaded = true;
      } catch (e) {
        this.error = true;

      }
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