<template>
<v-container>

  <!--Preview Card-->
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-card class="deg" v-on="on" rounded="xl" width="350">
        <v-img height="150px" :src="routine.image"></v-img>
        <v-row align="center" justify="start">
            <v-card-subtitle class="ml-3 white--text">{{ routine.name }}</v-card-subtitle>
            <v-spacer/>
            <v-icon class="mr-1" color="white" small>mdi-flash</v-icon>
            <span class="white--text caption mr-7">{{ routine.difficulty }}</span>
            <!-- <v-icon class="mr-1" color="white" small>mdi-timer-outline</v-icon>
            <span class="white--text mr-7 caption">{{ routine.duration }}</span> -->
        </v-row>
      </v-card>
    </template>
    
    <!--PopUp Detail-->
    <RoutinePopup :routine=routine :exercises=exercises :cycles=cycles v-on:closePop="dialog=false"  />
    
  </v-dialog>
</v-container>
</template>

<script>
  import RoutinePopup from "./RoutinePopup";
  export default {
    props: {
      routine: Object,
    },
    components: {
          RoutinePopup
        },
    data () {
      return {
        dialog: false,
        cycles: [
          { name:'Warmup', id: '1', repetitions: 1 },
          { name: 'Exercises', id: '2', repetitions: 2 },
          { name: 'Cooldown', id: '3', repetitions: 1 }
        ],
        exercises: [
          { name:'Ejercicio 1', id: '1', repetitions: 0, duration: 30, img: 'https://images.unsplash.com/flagged/photo-1573556291531-a5d957d7e4e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60', detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'},
          { name:'Ejercicio 2', id: '2', repetitions: 2, duration: 0, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 3', id: '3', repetitions: 0, duration: 15, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 5', id: '5', repetitions: 0, duration: 20, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'},
          { name:'Ejercicio 6', id: '6', repetitions: 1, duration:0, detail: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era. Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'}
        ]
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
    .deg {
        background-image: linear-gradient(to right, #5a00e0, #9752ff);
    }

    .closeBtn {
      background: rgba(255, 255, 255, 0.1);
    }

    #cycleCont {
      border-left: 12px solid white;
      border-right: 12px solid white;
    }
</style>