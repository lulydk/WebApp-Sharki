<template>
	<div>
		<div>
			<h1 class="mx-8 my-4">
				<v-icon class="icon" size=33px>mdi-compass-outline</v-icon>
				Explorar Rutinas
			</h1>
		</div>
		<div class="search-options">
			<v-container>
				<v-row>
					<v-col class="d-flex flex-column">
							<span>
								<v-icon>mdi-menu-down</v-icon>
								Búsqueda avanzada
							</span>
							<v-textarea class="search-text"
								rows=2
								color="sharkyPurple"
								background-color="white"
								outlined
								no-resize
								hint="Ej.: Cardio, piernas"
							></v-textarea>
							<v-textarea class="search-text"
								rows=1
								color="sharkyPurple"
								background-color="white"
								outlined
								no-resize
								hint="Ej.: En casa, bicicleta"
							></v-textarea>
					</v-col>
					<v-col>
						Duración
					</v-col>
					<v-col class="d-flex flex-column">
						Equipamiento
						<v-checkbox
							label="Sin equipamiento"
						></v-checkbox>
						<v-checkbox
							label="Colchoneta"
						></v-checkbox>
						<v-checkbox
							label="Elemento 2"
						></v-checkbox>
					</v-col>
					<v-col>
						Dificultad
						<v-checkbox
							label="Fácil"
						></v-checkbox>
						<v-checkbox
							label="Medio"
						></v-checkbox>
						<v-checkbox
							label="Difícil"
						></v-checkbox>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<v-layout class="mx-auto" row wrap>

			<v-flex class="mb-6" v-for="routine in routines" :key="routine.name">
				<RoutineCard :routine="routine"/>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import RoutineCard from "@/components/RoutineCard.vue";

export default {
	name: "Explore",
	components: {
		RoutineCard
	},
	data () {
		return {
			routines: [
				{	image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=794&q=80',
					name: 'Rutina 1',
					equipment: '-',
					isPublic: true,
					rating: '3',
					difficulty: 'Facil',
					duration: '00:30:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est set. Porin mattis tellus, rutrum cursuretal et era.'
				},
				{	image: '',
					name: 'Rutina 2',
					equipment: 'Pesas',
					isPublic: true,
					rating: '4',
					difficulty: 'Media',
					duration: '01:00:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
				},
				{	image: '',
					name: 'Rutina 3',
					equipment: '-',
					isPublic: false,
					rating: '2',
					difficulty: 'Dificil',
					duration: '01:30:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
				},
				{	image: '',
					name: 'Rutina 3',
					equipment: '-',
					isPublic: false,
					rating: '2',
					difficulty: 'Dificil',
					duration: '01:30:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
				},
				{	image: '',
					name: 'Rutina 3',
					equipment: '-',
					isPublic: false,
					rating: '2',
					difficulty: 'Dificil',
					duration: '01:30:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
				},
				{	image: '',
					name: 'Rutina 3',
					equipment: '-',
					isPublic: false,
					rating: '2',
					difficulty: 'Dificil',
					duration: '01:30:00',
					description: 'Lorem ipsum dolor sit amet, consectetur et a edipiscing elit. Nullam dignissim magna neque, nec auctori est sempera. Porin mattis tellus, rutrum cursuretal.'
				},
			]
		}
	}
}

</script>

<style scoped>
h1 {
	color: var(--v-sharkyPurple-base);
}
.icon {
	color: var(--v-sharkyPurple-base);
}
.search-options {
	background-color: var(--v-sharkyBack-base);
}
</style>