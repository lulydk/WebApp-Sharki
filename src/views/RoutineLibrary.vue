<template>
  <div>
    <!--Heading y botones-->
    <div class="my-4 mx-10">
      <h1 class="d-inline-block sharkyPurple--text">
        <v-icon class="pb-1" color="sharkyPurple" large>mdi-weight-lifter</v-icon>
        Biblioteca de Rutinas
      </h1>
    </div>

    <RoutinesBlock/>
  </div>
</template>

<script>
import RoutinesBlock from "@/components/RoutinesBlock";

export default {
  name: "RutineLibrary",
  components: {
    RoutinesBlock
  }
}
</script>

<style scoped>

</style>