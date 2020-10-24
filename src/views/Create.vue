<template>
  <div class="create mx-8 my-4">

    <!--Heading y botones-->
    <div class="mb-2">
      <h1 class="d-inline-block">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-plus-circle</v-icon>
        Crear Rutina
      </h1>
      <CreateButtons 
                      v-on:cancelClicked="cancelEdit()"
                      v-on:acceptClicked="publishRoutine()"
      />
    </div>

    <!--Ingreso de datos-->
    <div>
      <v-text-field class="nameInput d-inline-block mt-1" clearable
                    hide-details
                    label="Nombre de la rutina"
                    v-model="routine.name"
                    outlined/>

      <!--Boton de Toggle para publica/privada-->
      <span class="float-right">
        <v-switch
            v-model="routine.isPublic"
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
      <div v-for="c in cycles" :key="c.order">
        <RoutineSection v-if="c.type === type"
                        :cycle=c
                        class="mb-8"
                        v-on:trashClicked="deleteSection($event)"
                        v-on:register="registerSection($event)"
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
import { CategoriesApi, Cycle, Routine, RoutinesApi } from "@/api"
import Vue from 'vue';

const defaultCycles : Cycle[] = [
  {
    "name": "Fast Warmup",
    "detail": "",
    "type": Cycle.TypeEnum.Warmup,
    "order": 1,
    "repetitions": 2
  },
  {
    "name": "Jumping Exercises",
    "detail": "",
    "type": Cycle.TypeEnum.Exercise,
    "order": 2,
    "repetitions": 5
  },
  {
    "name": "Long Cooling",
    "detail": "",
    "type": Cycle.TypeEnum.Cooldown,
    "order": 3,
    "repetitions": 3
}];

// eslint-disable-next-line no-unused-vars
type SectionCallback = (id:number) => Promise<void>;

export default Vue.extend({
  name: "Create",
  components: {
    RoutineSection,
    CreateButtons
  },
  props: {
    routineId: Number,
  },
  data: function () {
    const ADD_CAT = 'Añadir...';
    return {
      //Las siguientes variables son para probar el diseño de la pagina
      categorias: [ADD_CAT],
      dificultades: Object.keys(Routine.DifficultyEnum),
      types: Object.values(Cycle.TypeEnum),
      category: "",
      dificulty: "",
      addCatString: ADD_CAT,
      new_cat: "",
      // Datos de prueba
      globalID: 4,
      cycles: [] as Cycle[],
      callbacks: [] as SectionCallback[],
      routine: {} as Routine,
    }
  },
  async mounted() {
    let categories = CategoriesApi.findCategories();
    let cats = (await categories).results || [];
    for(let cat of cats) {
      this.categorias.push(cat.name);
    }

    if(this.routineId === undefined) {
      this.routine = {
        name: "New routine",
        detail: "",
        isPublic: false,
        category: cats[0],
        difficulty: Routine.DifficultyEnum.Rookie
      };
    }
    else
      this.routine = await RoutinesApi.getRoutine(this.routineId);
    
    this.cycles = defaultCycles;
  },
  methods: {
    addSection: function (type: Cycle.TypeEnum) {
      let cycle: Cycle = {
        name: "Another Section",
        detail: "",
        type: type,
        repetitions: 1,
        order: 0
      };
      let index = this.cycles.reverse().findIndex(c => c.type == type);
      this.cycles.splice(index, 0, cycle);
      this.cycles.reverse();
      this.reorderSections();
    },
    reorderSections() {
      this.cycles.forEach((c, i) => c.order = i + 1);
    },
    deleteSection: function (order: number) {
      let index = this.cycles.findIndex(c => c.order == order);
      this.cycles.splice(index, 1);
    },
    getSectionName: function (type: Cycle.TypeEnum) {
      switch (type) {
        case Cycle.TypeEnum.Warmup:
          return "Calentamiento"
        case Cycle.TypeEnum.Exercise:
          return "Ejercitación"
        case Cycle.TypeEnum.Cooldown:
          return "Enfriamiento"
      }
    },
    addCategory: async function () {
      const cat = await CategoriesApi.addCategory({name: this.new_cat});
      this.categorias.push(cat.name);
      this.category = cat.name;
      this.new_cat = "";
    },
    async cancelEdit() {
      await this.$router.push("/");
    },
    registerSection(callback: () => Promise<void>) {
      this.callbacks.push(callback);
    },
    async publishRoutine() {
      let id = this.routineId;
      if(this.routineId == undefined)
        id = (await RoutinesApi.addRoutine(this.routine)).id;
      else
        await RoutinesApi.updateRoutine(this.routineId, this.routine);

      await Promise.all(this.callbacks.map(c => c(id)))
      await this.$router.push("/");
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