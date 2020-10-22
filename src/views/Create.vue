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

    <!--Lista de Categorias-->
    <div class="mt-7">
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
          class="ml-5 categoryBar d-inline-block"
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

    <div>
      <CreateButtons class="mb-10"/>
    </div>

  </div>
</template>

<script>
import RoutineSection from "@/components/RoutineSection.vue";
import CreateButtons from "@/components/CreateButtons";

export default {
  name: "Create",
  components: {
    RoutineSection,
    CreateButtons
  },
  data: function () {
    const ADD_CAT = 'Añadir...';
    return {
      //Las siguientes variables son para probar el diseño de la pagina
      categorias: [ADD_CAT, 'Brazos'],
      // Posta:
      publicSwitch: false,
      types: ['warmup', 'exercise', 'cooldown'],
      category: null,
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
      ]
    }
  },
  methods: {
    addSection: function (type) {
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
    deleteSection: function (id) {
      console.log(id);
      this.cycles = this.cycles.filter(function (cycle) {
        return cycle.id !== id;
      });
    },
    getSectionName: function (type) {
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
      this.new_cat = null;
    }
  },
}

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
  width: 30%;
}

#categoryBar {
  width: 30%;
}
</style>