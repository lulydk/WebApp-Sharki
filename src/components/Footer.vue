<template>
    <v-footer padless>
    <v-row justify="center" no-gutters class="deg py-4 text-center white--text">
      <v-btn v-for="link in links" :key="link.name" :to="link.to" text rounded class="my-2 white--text">
        {{ link.name }}
      </v-btn>
      <v-col cols="12">
        {{ new Date().getFullYear() }} — <strong>SHARKI</strong>
      </v-col>
    </v-row>
    </v-footer>
</template>

<script>
export default {
    data () {
        return {
            links: [ 
                { name:'Inicio', to:'/' },
                { name:'Acerca de', to: ''},
            ]
        }
    }
}
</script>

<style scoped>
    .deg {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }
</style>