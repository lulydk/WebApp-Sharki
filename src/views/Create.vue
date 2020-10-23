<template>
  <div class="create mx-8 my-4">

    <!--Heading y botones-->
    <div class="mb-2">
      <h1 class="d-inline-block">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-plus-circle</v-icon>
        Crear Rutina
      </h1>
      <CreateButtons/>
    </div>

    <!--Ingreso de datos-->
    <div>
      <v-text-field class="nameInput d-inline-block mt-1" clearable
                    hide-details
                    label="Nombre de la rutina"
                    outlined/>

      <!--Boton de Toggle para publica/privada-->
      <span class="float-right">
        <v-switch
            v-model="publicSwitch"
            :label="'Pública'"
            class="mr-5"
            color="sharkyPurple"
            inset
        ></v-switch>
      </span>
    </div>

    <!--Secciones de la rutina-->
    <div v-for="type in types" :key="type"
         class="mt-0">
      <h2 class="ma-4 sharkyPurple--text">{{ getSectionName(type) }}</h2>
      <!--Carrusel de Ejercicios-->
      <div v-for="c in cycles" :key="c.id">
        <RoutineSection v-if="c.type === type"
                        :cycle=c
                        :exercises_db=exercises
                        :images_db=images
                        class="mb-8"
                        v-on:trashClicked="deleteSection($event)"
        />
      </div>
      <!--Boton para agregar seccion-->
      <div class="my-4">
        <v-btn
            id="addButton"
            class="addButton v-size--x-large ml-5"
            color="sharkyPurple"
            outlined
            @click="addSection(type)">
          <v-icon>mdi-plus</v-icon>
          {{ "Agregar sección de " + getSectionName(type) }}
        </v-btn>
      </div>
    </div>


    <v-row class="mb-5">
      <v-col>
    <!--Lista de Categorias-->
    <div>
      <h3 class="d-inline-block ml-5 mt-6 sharkyPurple--text">
        Categoría de la rutina:
      </h3>
      <v-overflow-btn
          v-if="category!==addCatString"
          id="categoryBar"
          v-model="category"
          :items="categorias"
          class="ml-5 categoryBar d-inline-block"
          filled
          hide-details
          label="Seleccionar"
      />
      <span v-if="category===addCatString">
      <v-text-field
          class="ml-5 pt-4 categoryBar d-inline-block"
          filled
          hide-details
          label="Nueva categoría"
          v-model="new_cat"
      />
      <v-btn class="mb-5 ml-3" color="red"
             icon
             large
             @click="category=null"
      >
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
      <v-btn class="mb-5" color="green"
             icon
             large
             @click="addCategory()"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      </span>
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


    <div>
      <CreateButtons class="mb-10"/>
    </div>

  </div>
</template>

<script lang="ts">
import RoutineSection from "@/components/RoutineSection.vue";
import CreateButtons from "@/components/CreateButtons.vue";
import { CategoriesApi } from "@/api"
import Vue from 'vue';

export default Vue.extend({
  name: "Create",
  components: {
    RoutineSection,
    CreateButtons
  },
  data: function () {
    const ADD_CAT = 'Añadir...';
    return {
      //Las siguientes variables son para probar el diseño de la pagina
      categorias: [ADD_CAT],
      dificultades: [ 'rookie', 'beginner', 'intermediate', 'advanced', 'expert' ],
      // Posta:
      publicSwitch: false,
      types: ['warmup', 'exercise', 'cooldown'],
      category: "",
      dificulty: "",
      addCatString: ADD_CAT,
      new_cat: "",
      // Datos de prueba
      globalID: 4,
      cycles: [
        {
          "id": 1,
          "name": "Fast Warmup",
          "detail": "",
          "type": "warmup",
          "order": 1,
          "repetitions": 2
        },
        {
          "id": 2,
          "name": "Jumping Exercises",
          "detail": "",
          "type": "exercise",
          "order": 1,
          "repetitions": 5
        },
        {
          "id": 3,
          "name": "Long Cooling",
          "detail": "",
          "type": "cooldown",
          "order": 1,
          "repetitions": 3
        }
      ],
      exercises: [
        {
          "id": 1,
          "name": "Plancha",
          "detail": "",
          "type": "exercise",
          "duration": 30,
          "repetitions": 0,
          "order": 1
        },
        {
          "id": 2,
          "name": "Push-up",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 15,
          "order": 1
        },
        {
          "id": 3,
          "name": "Sentadilla",
          "detail": "",
          "type": "exercise",
          "duration": 0,
          "repetitions": 10,
          "order": 1
        },
      ],
      images: [
        {
          "id": 1,
          "number": 1,
          "url": "https://www.t-nation.com/system/publishing/articles/10001096/original/Unconventional-Workout-Abs.jpg?1515713332"
        },
        {
          "id": 2,
          "number": 1,
          "url": "https://lmimirror3pvr.azureedge.net/static/media/12867/2d5a7ea5-1c56-40e1-aba6-dbbfe959f35a/pushup-study_960x540.jpg"
        },
        {
          "id": 3,
          "number": 1,
          "url": "https://www.inposture.com/wp-content/uploads/2020/05/Sit-ups.jpg"
        }]
    }
  },
  mounted() : void{
    this.fetch();
  },
  methods: {
    addSection: function (type: string) {
      console.log(this.globalID);
      this.cycles.push({
        "id": this.globalID++,
        "name": "Another Section",
        "detail": "",
        "type": type,
        "order": 1,
        "repetitions": 1
      })
    },
    deleteSection: function (id: number) {
      console.log(id);
      this.cycles = this.cycles.filter(function (cycle) {
        return cycle.id !== id;
      });
    },
    getSectionName: function (type: string) {
      switch (type) {
        case 'warmup':
          return "Calentamiento"
        case 'exercise':
          return "Ejercitación"
        case 'cooldown':
          return "Enfriamiento"
      }
    },
    addCategory: function () {
      this.categorias.push(this.new_cat);
      this.category = this.new_cat;
      this.new_cat = "";
    },
    async fetch() : Promise<void> {
      let categories = new CategoriesApi().findCategories();
      let cats = (await categories).results || [];
      for(let cat of cats) {
        this.categorias.push(cat.name);
      }
    }
  },
})

</script>

<style scoped>
h1 {
  color: var(--v-sharkyPurple-base);
}

.v-text-field--outlined >>> fieldset {
  border-color: var(--v-sharkyPurple-base);
  border-width: 3px;
}

.nameInput {
  width: 50%;
}

.addButton {
  border-width: 3px;
}

#addButton {
  border-width: 3px;
}

.categoryBar {
  width: 50%;
}

#categoryBar {
  width: 50%;
}
</style>