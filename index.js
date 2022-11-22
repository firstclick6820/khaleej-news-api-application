// // Define the PORT
// const PORT= 5000

// // Import required Modules
// const express = require("express")
// const cheerio = require('cheerio')
// const axios = require('axios')



// // Initilize the app
// const app = express()

// // use the express-static middleware
// app.use(express.static("public"))





// // define the first route
// app.get("/", function (req, res) {
//   res.json("Now it is working")
// })



// // define the second route
// app.get("/news", function (req, res) {
//     res.json('News Section')
// })









// // start the server listening for requests
// app.listen(process.env.PORT || PORT, 
// 	() => console.log(`Server is running on PORT ${PORT}...`));



// define the port for running the local server.
const PORT = 5000;


// Import Required Modules
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')


// Just want to add a check purpuse


// URL for articles scraping
const KHALEEJ_NEWS_WEBSITE_URL  = "https://www.khaleejtimes.com/";



// Initialize the main Express APP
const app = express()



// Define our News API
const khaleejNewsApi = []





// Call a get request to grap all the articles from the khaleej News Site.
axios.get(KHALEEJ_NEWS_WEBSITE_URL).then((response)=> {
    const html = response.data
    // Loading data to the cheerio
    const $= cheerio.load(html)
    // Grap all the articles 
    const articles = $('.rendered_board_article');

  
    
    // articles.map((title)=> {
    //     let __title = $(title).text()
    //     my_data.push({name: `${__title}`, id: 2})
    // })


    // Loop through each article to grap more specific required elements.
    for (let i = 0; i < articles.length; i++) {


        // Grap the ID of the article
        let articleIDWrapper = $(articles[i]).find('article')[0],
            articleID = $(articleIDWrapper).attr("data-uuid")



        // Grap the article Title
        let articleTitleWrapper = $(articles[i]).find(".post-title")[0],
          articleTitle = $(articleTitleWrapper).text();
        

        //   Grap the article URL
        let articleUrlWrapper = $(articles[i]).find(".post-title > a")[0],
          articleUrl = $(articleUrlWrapper).attr("href");


        // Grap the article Summary
        let articleSummaryWrapper = $(articles[i]).find(".post-summary")[0],
            articleSummary = $(articleSummaryWrapper).text();



        // Grap the Article Image URl
        let articleImageUrlWrapper = $(articles[i]).find(".post-thumbnail > a > img")[0],
            articleImagesUrlList = $(articleImageUrlWrapper).attr('data-srcset')



    
            // Push the API to the dictionary
        
            khaleejNewsApi.push({
            Id:articleID ,
            headline: articleTitle,
            link: articleUrl,
            summary: articleSummary,
            imagesList: articleImagesUrlList,
        
           
            
           
        })
      
      }
    

    
})



app.get('/', (req, res) => {
    res.json(khaleejNewsApi)
   
})





app.listen(PORT, ()=> {console.log(`Server is running on PORT ${PORT}`)})