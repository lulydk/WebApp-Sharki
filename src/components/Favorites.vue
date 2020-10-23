<template>
  <RoutinesBlock name="Favoritos"/>
</template>

<script>
import RoutinesBlock from "@/components/RoutinesBlock";
export default {
  name: "Favorites",
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