<template>
  <v-container>
    <RoutinesBlock name="Mis Rutinas"/>
  </v-container>
</template>

<script>
import RoutinesBlock from "@/components/RoutinesBlock";
export default {
  name: "Routines",
  components: {
    RoutinesBlock
  },
  props: ['name'],
  data () {

  }
}
</script>

<style scoped>
.repes {
  width: 50px;
}
#repes {
  width: 50px;
}
</style>