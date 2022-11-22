// Define the PORT
const PORT= 5000

// Import required Modules
const express = require("express")
const cheerio = require('cheerio')
const axios = require('axios')



// Initilize the app
const app = express()

// use the express-static middleware
app.use(express.static("public"))





// define the first route
app.get("/", function (req, res) {
  res.json("Now it is working")
})



// define the second route
app.get("/news", function (req, res) {
    res.json('News Section')
})









// start the server listening for requests
app.listen(process.env.PORT || PORT, 
	() => console.log(`Server is running on PORT ${PORT}...`));