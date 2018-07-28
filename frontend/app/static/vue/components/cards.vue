<template>
    <v-container grid-list-xs fluid>
        <v-layout align-center wrap>
            <v-flex xs12 v-for="(price, ex) in prices" >
                <card :key="price" :ex="ex" :price="price" :highest="ex == maximum" :lowest="ex == minimum"></card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import card from './card.vue'
    export default{
        name:"cards",
        computed:{
            pair: function(){return this.$store.getters.pair},
            prices: function(){return this.$store.getters.prices},
            maximum: function(){
                var max = null
                var maxExchange = ""
                var keys = Object.keys(this.prices)
                for(var key in keys){
                    if (this.prices[keys[key]] > max || max == null){
                        maxExchange = keys[key]
                        max = this.prices[keys[key]]
                    }
                }
                return maxExchange
            },
            minimum: function(){
                var min = null
                var minExchange = ""
                var keys = Object.keys(this.prices)
                for(var key in keys){
                    if (this.prices[keys[key]] < min || min == null){
                        minExchange = keys[key]
                        min = this.prices[keys[key]]
                    }
                }
                return minExchange
            }
        },
        watch:{
            pair: function(val){
                this.$store.dispatch("fetch_prices", this.pair)
            }
        },
        components:{
            card: card
        }
    }
</script>
