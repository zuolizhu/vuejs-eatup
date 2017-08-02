<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Eatup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateEatup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="imageURL"
              label="Image URL"
              id="imageURL"
              v-model="imageURL"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageURL" height="175">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn 
              class="primary" 
              :disabled="!formIsValid" 
              type="submit">
                Create Eatup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageURL: '',
      description: ''
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageURL !== '' && this.description !== ''
    }
  },
  methods: {
    onCreateEatup () {
      if (!this.formIsValid) {
        return
      }
      const eatupData = {
        title: this.title,
        location: this.location,
        imageURL: this.imageURL,
        description: this.description,
        date: new Date()
      }
      this.$store.dispatch('createEatup', eatupData)
      this.$router.push('/eatups')
    }
  }
}
</script>
