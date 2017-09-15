<template>
    <v-dialog persistent v-model="signupDialog">
        <v-btn primary accent slot="activator">
            {{ userIsSignedup ? 'Unsignedup' : 'Signedup' }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsSignedup">Unsignup from Eatup ?</v-card-title>
                        <v-card-title v-else>Signup for Eatup ?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always change your idea later on :D</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn 
                            class="red--text darken-1" 
                            flat 
                            @click="signupDialog = false">Cancel</v-btn>
                            <v-btn 
                            class="green--text darken-1" 
                            flat 
                            @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['eatupId'],
  data () {
    return {
      signupDialog: false
    }
  },
  computed: {
    userIsSignedup () {
      return this.$store.getters.user.registeredEatups.findIndex(eatupId => {
        return eatupId === this.eatupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
    }
  }
}
</script>
