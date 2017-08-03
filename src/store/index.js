import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEatups: [
      { imageURL: 'https://cdn.wallpaper.com/main/styles/wp_large/s3/02_mona.jpg',
        id: 'zxcvbww123',
        title: 'Eatup in Albany',
        location: 'Albany',
        description: 'Enjoy Albany Food!',
        date: '2017-07-30'},
      { imageURL: 'https://wallpaperscraft.com/image/meat_sauce_restaurant_hot_43741_1920x1080.jpg',
        id: 'asgwerqefsa321',
        title: 'Eatup in New York',
        location: 'NYC',
        description: 'Splash Money in NYC!',
        date: '2017-07-29' }
    ],
    user: {
      id: 'qwertasdf123',
      registeredEatups: ['aaaaaddd1233123']
    }
  },
  mutations: {
    createEatup (state, payload) {
      state.loadedEatups.push(payload)
    }
  },
  actions: {
    createEatup ({commit}, payload) {
      const eatup = {
        title: payload.title,
        location: payload.location,
        imageURL: payload.imageURL,
        description: payload.description,
        date: payload.date
      }
      // Reach out to firebase and store it
      commit('createEatup', eatup)
    }
  },
  getters: {
    loadedEatups (state) {
      return state.loadedEatups.sort((eatupA, eatupB) => {
        return eatupA.data > eatupB.data
      })
    },
    featuredEatups (state, getters) {
      return getters.loadedEatups.slice(0, 5)
    },
    loadedEatup (state) {
      return (eatupId) => {
        return state.loadedEatups.find((eatup) => {
          return eatup.id === eatupId
        })
      }
    }
  }
})
