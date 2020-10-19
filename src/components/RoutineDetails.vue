<template>
    <v-card height="1000" width="1000">
        <v-card-title>{{ routine.name }}</v-card-title>
        <v-card-subtitle>{{ routine.difficulty }} {{ routine.duration }}</v-card-subtitle>
        <v-card-text> {{ routine.duration }} </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'RoutineDetails',
    props: {
        routine: Object
    }
}
</script>