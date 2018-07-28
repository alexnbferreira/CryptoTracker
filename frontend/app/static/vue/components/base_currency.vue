<template>
    <v-select v-model="selected_base" v-if="bases!=''" :items="bases" name="base" label="Base Currency">
    </v-select>
</template>

<script>
import Vuex from "vuex"
    export default{
        name: "base_currency",
        data(){
            return{
                selected_base: ""
            }
        },
        computed:{
            bases: function(){return this.$store.getters.bases}
        },
        watch:{
            selected_base: function(value){
                this.$store.dispatch("updateBase", value)
            }
        }
    }
</script>