import App from './components/app.vue'
import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(Vuex)
/**
 * Uncomment below when compiling to production
 */
Vue.config.devtools = true
Vue.config.debug = true
Vue.config.silent = false 
 

//import store from './store/store.js'
const store = new Vuex.Store({
  state: {
    bases: "",
    pairs: "",
    base: "",
    pair: "",
    prices: "",
    error: false,
    errorMessage: ""
  },
  getters:{
    pairs(state){
        return state.pairs
    },
    bases(state){
        return state.bases
    },
    pair(state){
        return state.pair
    },
    base(state){
        return state.base
    },
    prices(state){
        return state.prices
    },
    error(state){
      return state.error
    },
    errorMessage(state){
      return state.errorMessage
    }
  },
  actions:{
    fetch_pairs(context){

      return new Promise((resolve) => {
          axios.get("/products")
          .then((response) => {
              console.log(response.data)
              context.commit("setPairs", response.data)

              var bases = []
              response.data.forEach((pair, idx) => {
                if (!bases.includes(pair.substring(0, 3))){
                  bases.push(pair.substring(0, 3))
                }
              })
              context.commit("setBases", bases)
              resolve()
          })
          .catch((error) => {
            context.commit("setError", "There was a problem fetching currency pairs")
            setTimeout(() => {
              context.commit("clearError")
            }, 4000)
          })
      })
    },
    fetch_prices(context, payload){

      context.commit("setPrices", null)
      context.commit("clearErrors")

      return new Promise((resolve) => {
        axios.get("/products/"+payload+"/prices")
        .then((response) => {
          context.commit("setPrices", response.data)
        })
        .catch((error) => {
          context.commit("setError", "There was a problem fetching prices")
          setTimeout(() => {
            context.commit("clearError")
          }, 4000)
        })
      })
    },
    updateBase(context, payload){
      console.log("base is being updated")
      context.commit("setBase", payload)
    },
    updatePair(context, payload){
      console.log("pair is being updated")
      context.commit("setPair", payload)
    }
  },
  mutations:{
    setPairs(state, payload){
      console.log("setting pairs")
      state.pairs = payload
    },
    setBases(state, payload){
      state.bases = payload
    },
    setBase(state, payload){
      state.base = payload
    },
    setPair(state, payload){
      state.pair = payload
    },
    setPrices(state, payload){
      state.prices = payload
    },
    setError(state, payload){
      state.error = true
      state.errorMessage = payload
    },
    clearError(state){
      state.error = false
    }
  }
})


new Vue({
  el: '#app',
  store,
  render(createElement) {
    return createElement(App);
  }
})
