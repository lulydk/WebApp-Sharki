<template>
  <div class="create ma-8 ">

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
      <v-text-field outlined label="Nombre de la rutina" class="nameInput d-inline-block"></v-text-field>
      <span class="ml-4">
          <v-text-field outlined label="Tags" class="tagInput d-inline-block"></v-text-field>
          <button>
            <v-icon>mdi-menu-down</v-icon>
          </button>
        </span>
    </div>

    <!--Secciones de la rutina-->
    <RoutineSection name="Entrada en calor" class="my-4 mt-0"></RoutineSection>
    <RoutineSection name="Ejercitacion principal" class="my-4"></RoutineSection>
    <RoutineSection name="Enfriamiento" class="my-4"></RoutineSection>

    <CreateButtons class="mb-4"/>
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
</style>