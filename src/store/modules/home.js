import { SET_HOME_DATA } from '../mutationTypes'
import { GET_HOME_DATA } from '../actionTypes'
import axios from 'axios'

const state = {
  homeData: {}
}

// getters
const getters = {}

// actions
const actions = {
  async [GET_HOME_DATA] ({ commit }) {
    const res = await axios.get('https://swapi.co/api/films/1/')
    commit(SET_HOME_DATA, res.data)
  }
}

// mutations
const mutations = {
  [SET_HOME_DATA] (state, data) {
    state.homeData = data
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
