import * as firebase from 'firebase'

export default {
  state: {
    user: null
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
    setUser (state, payload) {
      state.user = payload
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
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
