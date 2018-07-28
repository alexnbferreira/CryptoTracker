<template>
    <v-select v-model="selected_pair" v-if="pairs!=''" :items="filtered_pairs" name="pair" label="Pair">
    </v-select>
</template>

<script>
import Vuex,{ mapGetters } from "vuex"
    export default{
        name: "pairs",
        data(){
            return{
                selected_pair: ""
            }
        },
        computed:{
            pairs: function(){return this.$store.getters.pairs},
            base: function(){return this.$store.getters.base},
            filtered_pairs: function(){
                return this.pairs.filter(pair => pair.startsWith(this.base))
            }  
        },
        watch:{
            selected_pair: function(value){
                console.log("updating pair")
                this.$store.dispatch("updatePair", value)
            }
        }
    }
</script>