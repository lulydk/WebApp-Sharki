<template>
    <v-card flat class="mx-auto" max-width="500">
        <v-card-title>Contactanos</v-card-title>
        <v-card-subtitle>Te estaremos respondiendo en la brevedad.</v-card-subtitle>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :rules="nameRules" class="mx-3" label="Nombre" required outlined></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" class="mx-3" label="E-mail" required outlined></v-text-field>
            <v-textarea outlined class="mx-3" label="Mensaje"></v-textarea>
            <v-btn to='/' class="mx-3" color="grey">Cancelar</v-btn>
            <v-btn dark color="#5a00e0" @click="send">Enviar</v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: 'Contact',
    data: () => ({
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      send () {
        
      }
    }
  }
</script>