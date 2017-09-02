<template>
    <v-dialog width = "300px" persistent v-model="editDialog">
        <v-btn accent slot="activator">
            Change Time
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Eatup Time</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker 
                        v-model="editableTime" 
                        style="width: 100%" actions format="24hr">
                            <template scope="{save, cancel}">
                                <v-btn 
                                    class="blue--text darken-1" 
                                    flat 
                                    @click.native="editDialog = false">Cancel</v-btn>
                                <v-btn 
                                    class="blue--text darken-1" 
                                    flat 
                                    @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['eatup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.eatup.date)

      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateEatupData', {
        id: this.eatup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableTime = new Date(this.eatup.date).toTimeString()
  }
}
</script>
