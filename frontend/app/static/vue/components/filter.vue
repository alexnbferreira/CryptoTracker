<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <span class="headline">Filter currencies</span>
            </v-flex>
        </v-layout>
        <v-layout wrap>
            <v-flex class="md5 xs12">
                <basecur class="md-layout-item md-size-50 md-small-size-100"></basecur>
            </v-flex>
            <v-flex class="md5 offset-md2 xs12">
                <pairs></pairs>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import base_currency from "./base_currency.vue"
    import pairs from './pairs.vue'
    export default{
        name: "filter",
        components: {
            basecur: base_currency,
            pairs: pairs
        }
    }
</script>