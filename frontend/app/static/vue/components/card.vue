<template>
    <v-card transition="scale-transition" :class="{'red darken-1': lowest, 'green darken-1': highest}">
      <v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs6 class="headline">
              <h3 class="py2">{{ex}}</h3>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <span>
                {{price}}
              </span>
              <br>
              <span>
                {{pair}}
              </span>
            </v-flex>
          </v-layout>
          
        </v-container>
      </v-card-title>
    </v-card>
</template>

<script>
    export default{
        name: "card",
        props: ["ex", "price", "lowest", "highest"],
        computed:{
          pair: function(){return this.$store.getters.pair}
        }
    }
</script>