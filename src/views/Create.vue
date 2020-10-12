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
      <v-text-field outlined clearable
                    label="Nombre de la rutina"
                    class="nameInput d-inline-block"/>
      <span class="ml-4">
          <v-text-field outlined clearable
                        label="Tags"
                        class="tagInput d-inline-block"
                        append-icon="mdi-menu-down"
                        @click:append="tags"/>
        </span>
    </div>

    <!--Secciones de la rutina-->
    <RoutineSection name="Seccion 1" class="my-8 mt-0"></RoutineSection>
    <RoutineSection v-for="n in secciones" :key="n"
        name="Seccion" class="my-8"/>

    <div class="my-4">
      <v-btn
          class="addButton v-size--x-large"
          id="addButton"
          color="sharkyPurple"
          elevation="2"
          outlined
          @click="secciones++">
        <v-icon>mdi-plus</v-icon>
        Añadir bloque de ejercicios
      </v-btn>
    </div>


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
    }
  },
  methods: {
    tags () {

    }
  }
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
  width: 40%;
}

.tagInput {
  width: 30%;
}

.addButton {
  border-width: 3px;
}
#addButton {
  border-width: 3px;
}
</style>