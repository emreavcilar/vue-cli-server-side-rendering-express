import { SET_ABOUT_DATA } from '../mutationTypes'
import { GET_ABOUT_DATA } from '../actionTypes'
import axios from 'axios'

const state = {
  aboutData: {}
}

// getters
const getters = {}

// actions
const actions = {
  async [GET_ABOUT_DATA] ({ commit }) {
    const res = await axios.get('https://swapi.co/api/people/1/')
    commit(SET_ABOUT_DATA, res.data)
  }
}

// mutations
const mutations = {
  [SET_ABOUT_DATA] (state, data) {
    state.aboutData = data
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
