<template>
    <v-dialog width = "300px" persistent v-model="editDialog">
        <v-btn accent slot="activator">
            Change Date
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Eatup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker 
                        v-model="editableDate" 
                        style="width: 100%" actions>
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
                        </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.eatup.date)

      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateEatupData', {
        id: this.eatup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableDate = new Date(this.eatup.date)
  }
}
</script>
