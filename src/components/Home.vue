<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/eatups" class="info">Look for Eatup</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/eatup/new" class="info">New Eatup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
        indeterminate 
        class="primary--text" 
        :width="7" 
        :size="70" 
        v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="eatup in eatups" 
          :src="eatup.imageURL" 
          :key="eatup.id"
          @click="onLoadEatup(eatup.id)">
          <div class="title">
            {{ eatup.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome eatups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  computed: {
    eatups () {
      return this.$store.getters.featuredEatups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadEatup (id) {
      this.$router.push('/eatups/' + id)
    }
  }
}
</script>


<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    color: white;
    font-size: 2em;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px;
  }
</style>
