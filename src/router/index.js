import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Eatups from '@/components/Eatup/Eatups'
import CreateEatup from '@/components/Eatup/CreateEatup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Login from '@/components/User/Login'
import Eatup from '@/components/Eatup/Eatup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/eatups',
      name: 'Eatups',
      component: Eatups
    },
    {
      path: '/eatup/new',
      name: 'CreateEatup',
      component: CreateEatup
    },
    {
      path: '/eatups/:id',
      name: 'Eatup',
      component: Eatup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
