import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import Project3 from '../views/Project3.vue'
//import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue')
  },
  {
    path: '/recorderSpace',
    name: 'RecorderSpace',
    component: () => import(/* webpackChunkName: "recorderSpace" */ '../views/RecorderSpace.vue')
  },
  {
    path: '/recorderSpace2',
    name: 'RecorderSpace2',
    component: () => import(/* webpackChunkName: "recorderSpace" */ '../views/RecorderSpace2.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  },
  {
    path: '/Project3',
    name: 'Project3',
    component: Project3
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
