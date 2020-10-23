import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Create from '../views/Create.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Contact from '../views/Contact.vue'
import Explore from '../views/Explore.vue'
import ExerciseLibrary from '../views/ExerciseLibrary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/contact',
    name: 'Contactanos',
    component: Contact
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: PageNotFound
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/library',
    name: 'Library',
    component: ExerciseLibrary
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
