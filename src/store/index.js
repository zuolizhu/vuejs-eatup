import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEatups: [
      { imageURL: 'https://cdn.wallpaper.com/main/styles/wp_large/s3/02_mona.jpg',
        id: 'zxcvbww123',
        title: 'Eatup in Albany',
        location: 'Albany',
        description: 'Enjoy Albany Food!',
        date: new Date()},
      { imageURL: 'https://wallpaperscraft.com/image/meat_sauce_restaurant_hot_43741_1920x1080.jpg',
        id: 'asgwerqefsa321',
        title: 'Eatup in New York',
        location: 'NYC',
        description: 'Splash Money in NYC!',
        date: new Date() }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedEatups (state, payload) {
      state.loadedEatups = payload
    },
    createEatup (state, payload) {
      state.loadedEatups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadEatups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('eatups').once('value')
      .then((data) => {
        const eatups = []
        const obj = data.val()
        for (let key in obj) {
          eatups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageURL: obj[key].imageURL,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedEatups', eatups)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', true)
        }
      )
    },
    createEatup ({commit, getters}, payload) {
      const eatup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageURL
      let key
      firebase.database().ref('eatups').push(eatup).then((data) => {
        key = data.key
        return key
      }).then(key => {
        const filename = payload.image.name
        const extension = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('eatups/' + key + '.' + extension).put(payload.image)
      }).then(imageInfo => {
        imageURL = imageInfo.metadata.downloadURLs[0]
        return firebase.database().ref('eatups').child(key).update({imageURL: imageURL})
      }).then(() => {
        commit('createEatup', {
          ...eatup,
          imageURL: imageURL,
          id: key
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredEatups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    loginUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredEatups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredEatups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
