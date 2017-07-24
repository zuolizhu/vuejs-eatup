<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/TGI_Fridays_logo.svg/1280px-TGI_Fridays_logo.svg.png"
                      height="130px"
                    ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="white mb-0">TGI Friday</div>
                    <div>24th July 2017</div>
                  </div>
              </v-card-title>
              <v-card-actions>
                <v-btn to="/eatups/1">
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
