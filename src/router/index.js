import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import { Routes } from '@/config/constants/routePaths'

Vue.use(Router)
Vue.use(Meta)

const routes = [
  {
    name: 'home',
    path: Routes.HOME,
    component: () => import('../ui/pages/Home.vue')
  },
  {
    name: 'about',
    path: Routes.ABOUT,
    component: () => import('../ui/pages/About.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: routes
  })
}
