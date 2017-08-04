<template>
  <v-container>
    <v-layout row wrap v-for="eatup in eatups" :key="eatup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                      :src="eatup.imageURL"
                      height="130px"
                    ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="white mb-0">{{eatup.title}}</div>
                    <div>{{eatup.date | date}}</div>
                  </div>
              </v-card-title>
              <v-card-actions>
                <v-btn :to="'/eatups/' + eatup.id">
                  <v-icon left light>arrow_forward</v-icon> View Menu</v-btn>
              </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    eatups () {
      return this.$store.getters.loadedEatups
    }
  }
}
</script>
