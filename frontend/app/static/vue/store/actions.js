export default{
    fetch_pairs(context){
        console.log("fetching pairs from server")
        return new Promise((resolve) => {
            this.$http.get("/products").then((response) => {
                console.log(response.data.message)
                resolve()
            })
        })
    }
}