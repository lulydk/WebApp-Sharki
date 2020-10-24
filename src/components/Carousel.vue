<template>
    <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(rout, i) in routines" :key="i">
            <v-sheet color="sharkyLight" height="100%">
                <v-img height="300" :src="rout.image" gradient="to left, rgba(90,0,224,0.5), #9752FF">
                    <v-col class="mt-5 ml-5">
                        <span class="display-1 font-weight-semibold">{{ rout.name }}</span>
                    </v-col>
                    <v-col class="ml-5">
                        <v-icon small left>mdi-flash</v-icon>
                        <span class="font-weight-bold">Dificultad: </span>{{ rout.difficulty }}
                    </v-col>
                    <v-col cols="8" class="ml-5">
                        <v-icon small left>mdi-information-outline</v-icon>
                        <span class="font-weight-bold">Descripción: </span>{{ rout.description }}
                    </v-col>
                </v-img>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    props: {
        routines: Array,
    }
}
</script>