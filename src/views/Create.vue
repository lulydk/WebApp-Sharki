<template>
  <div class="create mx-8 my-4">

    <!--Heading y botones-->
    <div class="mb-2">
      <h1 class="d-inline-block">
        <v-icon class="pb-1" color="sharkyLight">mdi-plus-circle</v-icon>
        Crear Rutina
      </h1>
      <CreateButtons/>
    </div>

    <!--Ingreso de datos-->
    <div>
      <v-text-field class="nameInput d-inline-block mt-1 ml-5" clearable
                    label="Nombre de la rutina"
                    outlined/>

      <!--Boton de Toggle para publica/privada-->
      <span class="float-right">
        <v-switch
            class="mr-5"
            v-model="publicSwitch"
            inset
            color="sharkyPurple"
            :label="'Pública'"
        ></v-switch>
      </span>
    </div>
    <!--Lista de Categorias-->
    <div>
      <h3 class="d-inline-block ml-5 sharkyPurple--text">Categoría:</h3>
    <v-overflow-btn
        class="ml-5 categoryBar d-inline-block"
        id="categoryBar"
        filled
        :items="categorias"
        label="Seleccionar"
    />
    </div>

        <!--v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
        <v-btn class="custom-transform-class text-none pa-5 mb-2"
               color="sharkyPurple"
               dark
               depressed
               v-bind="attrs"
               v-on="on">
          Categoría
          <v-icon class="pl-2">mdi-menu-down</v-icon>
        </v-btn>
        </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in categorias"
              :key="index"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
             </v-list-item>
          </v-list>
        </v-menu-->

    <!--Secciones de la rutina-->
    <RoutineSection class="my-8 mt-0" name="Entrada en calor"></RoutineSection>

    <RoutineSection class="my-8" name="Seccion 1"></RoutineSection>

    <RoutineSection v-for="n in secciones" :key="n"
                    class="my-8" name="Seccion"/>

    <div class="my-4">
      <v-btn
          id="addButton"
          class="addButton v-size--x-large"
          color="sharkyPurple"
          outlined
          @click="secciones++">
        <v-icon>mdi-plus</v-icon>
        Añadir bloque de ejercicios
      </v-btn>
    </div>

    <RoutineSection class="my-8" name="Enfriamiento"></RoutineSection>

    <div>
      <CreateButtons class="mb-4"/>
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
    return {
      secciones: 0,
      categorias: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'],
      publicSwitch: false
    }
  },
  methods: {}
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
  width: 1000px;
}

.addButton {
  border-width: 3px;
}

#addButton {
  border-width: 3px;
}

.categoryBar {
  width: 880px;
}

#categoryBar {
  width: 880px;
}
</style>