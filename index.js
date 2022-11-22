// import modules
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


// Define the port
const PORT = 5000

// Initilize the app
const app = express()

// Define the initial URL

app.get('/', (req, res)=> {
    res.json('Hello, World')
})




app.listen(PORT, ()=> {console.log(`Server is running on PORT ${PORT}`)})