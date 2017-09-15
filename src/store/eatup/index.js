import * as firebase from 'firebase'

export default {
  state: {
    loadedEatups: []
  },
  mutations: {
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
}
