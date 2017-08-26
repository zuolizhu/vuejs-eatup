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
              <v-btn raised @click="onPickFile">Upload Image</v-btn>
              <input 
              type="file" 
              style="display: none" 
              ref="fileInput" 
              accept="image/*" 
              @change="onFilePicked">
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
              <h4>Choose a Data & Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
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
      description: '',
      date: new Date(),
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageURL !== '' && this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
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
        date: this.submittableDateTime
      }
      this.$store.dispatch('createEatup', eatupData)
      this.$router.push('/eatups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please upload a valid image file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
