<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
        indeterminate 
        class="primary--text" 
        :width="7" 
        :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h6 class="primary--text">{{eatup.title}}</h6>
                    <template v-if="userIsCreator">
                      <v-spacer>

                      </v-spacer>
                      <app-edit-eatup-details-dialog :eatup="eatup"></app-edit-eatup-details-dialog>
                    </template>
                </v-card-title>
                <v-card-media
                      :src="eatup.imageURL"
                      height="300px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text">{{eatup.date | date}} - {{eatup.location}}</div>
                        <div><app-edit-eatup-date-dialog :eatup="eatup" v-if="userIsCreator"></app-edit-eatup-date-dialog></div>
                        <div>{{eatup.description}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Sign Up</v-btn>
                    </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    eatup () {
      return this.$store.getters.loadedEatup(this.id)
    },
    userIsAuthed () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthed) {
        return false
      }
      return this.$store.getters.user.id === this.eatup.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
