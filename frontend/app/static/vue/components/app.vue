 <template>
  <v-app id="app" style="width: 100%">
    <v-content>
      <v-container>
        <v-layout class="my-5 ">
          <v-flex xs12 class="text-xs-center">
            <span class="display-2">Crypto Tracker</span>
          </v-flex>
        </v-layout>
        <v-layout class="my-2">
          <v-flex md4 xs12 offset-md4>
            <pairfilter></pairfilter>
          </v-flex>
        </v-layout>
        <v-layout class="my-2">
          <v-flex xs12 md8 offset-md2 lg6 offset-lg3>
            <cards></cards>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
                <v-alert
                :value="error"
                type="error"
                >
                {{errorMessage}}
                </v-alert>
            </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Welcome
          </v-card-title>

          <v-card-text>
            This is a simple crypto tracker that shows you prices on currency pairs that are common between the exchanges BTX, BNB, and BFX.<br>
            All you have to do is pick one of the available pairs. You can optionally filter them by their base currency.<br>
            The exchange with the highest price will be highlighted in green, while the one with the lowest, in red.<br>
            Enjoy!
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              Next
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>




<script>
import filter from './filter.vue'
import cards from './cards.vue'
  export default {
    name: 'App',
    data(){
      return{
        dialog: true
      }
    },
    components:{
      pairfilter: filter,
      cards: cards
    },
    mounted(){
      console.log("Dispatching")
      this.$store.dispatch("fetch_pairs")
    },
    computed:{
      error: function(){return this.$store.getters.error},
      errorMessage: function(){return this.$store.getters.errorMessage}
    }
  }
</script>
