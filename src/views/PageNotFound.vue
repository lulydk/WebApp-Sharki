<template>
    <v-container fluid class="pb-4">
        <v-col align-self="center">
            <h1 class="text-center">ERROR 404:</h1>
            <h1 class="text-center">Page not found</h1>
            <p class="mt-2 text-center">No pudimos encontrar la página que estás buscando</p>
            <v-img contain height="300" src="../assets/babyshark.png"/>
            <v-row class="mt-4" justify="center">
                <v-btn class="mr-6" dark color="#5a00e0" to="/">Página principal</v-btn>
                <v-btn dark color="#5a00e0" to="/contact">Contactanos</v-btn>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>