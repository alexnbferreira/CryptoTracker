from flask import Flask, Response, render_template
import requests
import json
import logging
from pandas import read_json
from decimal import Decimal


app = Flask(__name__)
exchanges = ["BNB", "BTX", "BFX"]
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZiZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE"
logging.basicConfig()
logger = logging.getLogger(__name__)

base_currencies = None

@app.route("/products", methods=["GET"])
def get_products():
    #This end points fetches the list of pairs for each exchange,
    #updates the global list "common_pairs" with currency pairs common in all 3 exchanges
    #and sends it as a json
    headers = {"Authorization": "Bearer {}".format(token)}
    api_endpoint = "https://api.moneeda.com/api/exchanges/{}/products"
    common_pairs = None
    for exchange in exchanges:
        # Fetch products for each exchange and store the pairs
        try:
            resp = requests.get(api_endpoint.format(exchange), headers=headers).text
            pairs_df = read_json(resp)
            pairs = pairs_df["id"].tolist() 

            # Create the set of pairs that appear on all exchanges
            if common_pairs == None:
                common_pairs = set(pairs)
            else:
                common_pairs = common_pairs & set(pairs)
        except requests.exceptions.ConnectionError as e:
            logger.error("No response from server")
            logger.error(e)
            continue

    return Response(json.dumps(list(common_pairs)), mimetype="application/json")

@app.route("/products/<pair>/prices", methods=["GET"])
def get_product_prices(pair):
    #This endpoint fetches the price for a given <pair> and returns it's price for each of the listed exchanges in a json object
    headers = {"Authorization": "Bearer {}".format(token)}
    api_endpoint = "https://api.moneeda.com/api/exchanges/{exchange}/ticker?product={pair}"

    prices = {}
    for exchange in exchanges:
        endp = api_endpoint.format(exchange=exchange, pair=pair)

        try:
            ticker = requests.get(endp, headers=headers).text
            ticker_json = json.loads(ticker, parse_float=Decimal)
            prices[exchange] = str(ticker_json["price"])
        except requests.exceptions.ConnectionError as e:
            logger.error("Error fetching prices")
            logger.error(e)
            continue
    return Response(json.dumps(prices), mimetype="application/json")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

app.run(debug=True)