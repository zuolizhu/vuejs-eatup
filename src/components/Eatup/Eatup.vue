<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h6 class="primary--text">{{eatup.title}}</h6>
                    <template v-if="true">
                      <v-spacer>

                      </v-spacer>
                      <app-edit-eatup-details-dialog></app-edit-eatup-details-dialog>
                    </template>
                </v-card-title>
                <v-card-media
                      :src="eatup.imageURL"
                      height="300px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text">{{eatup.date | date}} - {{eatup.location}}</div>
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
    }
  }
}
</script>
