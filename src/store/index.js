import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import homeModule from '@/store/modules/home'
import aboutModule from '@/store/modules/about'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export function createStore () {
  return new Vuex.Store({
    modules: {
      home: homeModule,
      about: aboutModule
    },
    state: {},
    mutations: {},
    actions: {},
    strict: debug,
    plugins
  })
}
