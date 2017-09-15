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
    signupUserForEatup (state, payload) {
      const id = payload.id
      if (state.user.registeredEatups.findIndex(eatup => eatup.id === id) >= 0) {
        return
      }
      state.user.registeredEatups.push(id)
      state.user.firebaseKeys[id] = payload.firebaseKey
    },
    unsignupUserForEatup (state, payload) {
      const registeredEatups = state.user.registeredEatups
      registeredEatups.splice(registeredEatups.findIndex(eatup => eatup.id === payload), 1)
      Reflect.deleteProperty(state.user.firebaseKeys, payload)
    },
    setLoadedEatups (state, payload) {
      state.loadedEatups = payload
    },
    createEatup (state, payload) {
      state.loadedEatups.push(payload)
    },
    updateEatup (state, payload) {
      const eatup = state.loadedEatups.find(eatup => {
        return eatup.id === payload.id
      })
      if (payload.title) {
        eatup.title = payload.title
      }
      if (payload.description) {
        eatup.description = payload.description
      }
      if (payload.date) {
        eatup.date = payload.date
      }
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
    signupUserForEatup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
      .push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('signupUserForEatup', {id: payload, firebaseKey: data.key})
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    unsignupUserForEatup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.firebaseKeys) {
        return
      }
      const firebaseKey = user.firebaseKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(firebaseKey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unsignupUserForEatup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
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
            location: obj[key].location,
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
    updateEatupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('eatups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateEatup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
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
            registeredEatups: [],
            firebaseKeys: {}
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
            registeredEatups: [],
            firebaseKeys: {}
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
    autoLogin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredEatups: [],
        firebaseKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations')
      .once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredEatups = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredEatups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredEatups: registeredEatups,
          firebaseKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
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
