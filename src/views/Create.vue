<template>
  <div class="create mx-8 my-4">

    <!--Heading y botones-->
    <div class="mb-2">
      <h1 v-if="routineId==='0'" class="d-inline-block">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-plus-circle</v-icon>
        Crear Rutina
      </h1>
      <h1 v-if="routineId!=='0'" class="d-inline-block">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-lead-pencil</v-icon>
        Modificar Rutina
      </h1>

      <CreateButtons
          v-on:acceptClicked="publishRoutine()"
          v-on:cancelClicked="cancelEdit()"
      />
    </div>

    <!--Ingreso de datos-->
    <div>
      <v-text-field v-model="routine.name" class="nameInput d-inline-block mt-1"
                    clearable
                    hide-details
                    label="Nombre de la rutina"
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
      <div v-for="c in cycles" :key="c.cycle.order">
        <RoutineSection v-if="c.cycle.type === type"
                        :cycle=c.cycle
                        :routine-id=realRoutineId
                        :exists=c.exists
                        class="mb-8"
                        v-on:register="registerSection($event)"
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
              :items="categories_label"
              class="ml-5 categoryBar d-inline-block"
              filled
              hide-details
              label="Seleccionar"
          />
          <span v-if="category===addCatString">
      <v-text-field
          v-model="new_cat"
          class="ml-5 pt-4 categoryBar d-inline-block"
          filled
          hide-details
          label="Nueva categoría"
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
              v-model="routine.difficulty"
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
      <CreateButtons class="mb-10"
                     v-on:acceptClicked="publishRoutine()"
                     v-on:cancelClicked="cancelEdit()"
      />
    </div>

  </div>
</template>

<script lang="ts">
import RoutineSection from "@/components/RoutineSection.vue";
import { SectionCallback } from "@/components/RoutineSection.vue";
import CreateButtons from "@/components/CreateButtons.vue";
import {CategoriesApi, Cycle, CyclesApi, FullCategory, FullCycle, Routine, RoutinesApi} from "@/api"
import Vue from 'vue';

const defaultCycles: Cycle[] = [
  {
    "name": "Calentamiento",
    "detail": "",
    "type": Cycle.TypeEnum.Warmup,
    "order": 1,
    "repetitions": 0
  },
  {
    "name": "Ejercitación",
    "detail": "",
    "type": Cycle.TypeEnum.Exercise,
    "order": 2,
    "repetitions": 0
  },
  {
    "name": "Enfriamiento",
    "detail": "",
    "type": Cycle.TypeEnum.Cooldown,
    "order": 3,
    "repetitions": 0
  }];

interface RoutineEntry {
  cycle: Cycle
  exists: boolean
}

export default Vue.extend({
  name: "Create",
  components: {
    RoutineSection,
    CreateButtons
  },
  props: {
    routineId: String,
  },
  data: function () {
    const ADD_CAT = 'Añadir...';
    return {
      //Las siguientes variables son para probar el diseño de la pagina
      categories_label: [ADD_CAT],
      categories: [] as FullCategory[],
      dificultades: Object.values(Routine.DifficultyEnum),
      types: Object.values(Cycle.TypeEnum),
      category: "None",
      addCatString: ADD_CAT,
      new_cat: "",
      cycles: [] as RoutineEntry[],
      callbacks: [] as SectionCallback[],
      routine: {} as Routine,
      realRoutineId: 0 as number
    }
  },
  async mounted() {
    this.realRoutineId = +this.routineId;
    this.categories = (await CategoriesApi.findCategories()).results;
    this.categories_label = this.categories.map(c => c.name);

    if (this.realRoutineId === 0) {
      //Si estoy haciendo una rutina nueva
      this.routine = {
        name: "New routine",
        detail: "",
        isPublic: false,
        category: {id : 0},
        difficulty: Routine.DifficultyEnum.Rookie
      };
      this.cycles = defaultCycles.map(c => ({ cycle: c, exists: false}));
    } else {
      //Si quiero acceder a una rutina que ya existe
      this.routine = await RoutinesApi.getRoutine(this.realRoutineId);
      this.cycles = (await CyclesApi.findCycles(this.realRoutineId)).results
                    .map(c => ({ cycle: c, exists: true}));
    }
  },
  methods: {
    addSection: function (type: Cycle.TypeEnum) {
      let cycle: Cycle = {
        name: "Nueva sección",
        detail: "",
        type: type,
        repetitions: 0,
        order: 0
      };
      let index = this.cycles.reverse().findIndex(c => c.cycle.type == type);
      this.cycles.splice(index, 0, ({cycle: cycle, exists: false}));
      this.cycles.reverse();
      this.reorderSections();
    },
    reorderSections() {
      this.cycles.forEach((c, i) => c.cycle.order = i + 1);
    },
    deleteSection: async function (order: number) {
      let index = this.cycles.findIndex(c => c.cycle.order == order);
      const entry = this.cycles[index];
      this.cycles.splice(index, 1);
      this.callbacks.filter(c => c.cycle !== entry.cycle);
      if(entry.exists)
        await CyclesApi.deleteCycle(this.realRoutineId, (entry.cycle as FullCycle).id)
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
      this.categories_label.push(cat.name);
      this.categories.push(cat);
      this.category = cat.name;
      this.new_cat = "";
    },
    async cancelEdit() {
      await this.$router.push("/");
    },
    registerSection(callback: SectionCallback) {
      this.callbacks.push(callback);
    },
    async publishRoutine() {
      let id = this.realRoutineId;
      this.routine.category = this.categories.find(c => c.name == this.category) ?? this.categories[0];
      if (this.routineId == '0')
        id = (await RoutinesApi.addRoutine(this.routine)).id;
      else
        await RoutinesApi.updateRoutine(this.realRoutineId, this.routine);

      await Promise.all(this.callbacks.map(c => c.callback(id)))
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