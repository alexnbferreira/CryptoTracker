# CryptoTracker

This is a simple web solution for a crypto tracker using Moneeda's API to fetch prices from various exchanges and display them in a simple interface.
The app is composed of two parts: 

    -   Front-end: Vue2 SPA using Vuetify.js components and Vuex state manager
    -   Back-end: Simple Flask webserver with 2 endpoints

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Python 2.7 (virtualenvironment is recommended). Included is a requirements.txt file that can be used to install necessary modules.
For the frontend, npm is used to install the necessary packages. Included is a package.json file to install necessary packages.

### Installing

To get the backend environment ready to run / develop:

Install Python 2.7 (optionally activate a new virtual environments) and then install the modules

```
pip install -r requirements.txt
```

For the frontend, npm is required. This is the command to install the packages:
```
npm install 
```


## Running

To deploy: 

Run the file "backend.py" (inside the backend folder)
```
python backend.py
```

By default the webapp is available at: http://localhost:5000

## Frontend compiling

The files inside the frontend folder are compiled into one build.js, which is moved inside the static folder of the backend
To compile, we use webpack, running the following command inside the frontend folder:
```
webpack
```



## Authors

* **Alexandre Ferreira** - *Creator* - [alexnbferreira](https://github.com/alexnbferreira)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details