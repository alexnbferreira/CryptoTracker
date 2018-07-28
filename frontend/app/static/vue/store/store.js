//import mutations from './mutations';
import Vuex from "vuex"

export default new Vuex.Store({
  state: {
    bases: "",
    pairs: "",
    base: "",
    pair: "",
    prices: ""
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
    }
  },
  actions:{
    fetch_pairs(context){
      console.log("fetching pairs from server")
      return new Promise((resolve) => {
          this.$http.get("/products").then((response) => {
              console.log(response.data.message)
              context.commit("setPairs", response.data.message)
              resolve()
          })
      })
    }
  },
  mutations:{
    setPairs(state, payload){
      state.pairs = payload
    },
    setBases(state, payload){
      state.bases = payload
    },
    setBase(state, payload){
      state.base = payload
    },
    setPair(state, payload){
      state.pair = pair
    },
    setPrices(state, payload){
      state.prices = payload
    }
  }
})