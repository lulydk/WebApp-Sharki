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
import RoutineLibrary from '../views/RoutineLibrary.vue'
import Verification from '../views/Verification.vue'
import CloseSession from "@/views/CloseSession.vue";

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
    path: '/create/:routineId',
    name: 'Create',
    component: Create,
    props: true
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
    path: '/explore/:id',
    name: 'Explore',
    component: Explore,
    props: true
  },
  {
    path: '/library',
    name: 'Library',
    component: ExerciseLibrary
  },
  {
    path: '/routines',
    name: 'Routines',
    component: RoutineLibrary
  },
  {
    path: '/verification/:code',
    name: 'Verification',
    component: Verification,
    props: true
  },
  {
    path: '/close',
    name: 'Close Session',
    component: CloseSession
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
