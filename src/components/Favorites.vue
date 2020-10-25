<template>
  <RoutinesBlock name="Favoritos" favorites/>
</template>

<script>
import RoutinesBlock from "@/components/RoutinesBlock";
export default {
  name: "Favorites",
  components: {
    RoutinesBlock
  },
  props: ['name'],
}
</script>

<style scoped>

</style>