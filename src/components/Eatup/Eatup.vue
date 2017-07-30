<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h6 class="primary--text">{{eatup.title}}</h6>
                </v-card-title>
                <v-card-media
                      :src="eatup.imageURL"
                      height="300px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text">{{eatup.date}} - Crossgates</div>
                        <div>Text goes here</div>
                    </v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Sign Up</v-btn>
                    </v-card-action>
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
