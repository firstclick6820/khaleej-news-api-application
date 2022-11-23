// define the port for running the local server.
const PORT = 5000;



// Import Required Modules
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors');

// Just want to add a check purpuse


// URL for articles scraping
const KHALEEJ_NEWS_WEBSITE_URL  = "https://www.khaleejtimes.com/";







const corsOptions ={
    origin:`http://localhost:${PORT}`, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// Initialize the main Express APP
const app = express()



app.use(cors(corsOptions));

// Define our News API
const khaleejNewsApi = []





// Call a get request to grap all the articles from the khaleej News Site.
axios.get(KHALEEJ_NEWS_WEBSITE_URL).then((response)=> {
    const html = response.data
    // Loading data to the cheerio
    const $= cheerio.load(html)
    // Grap all the articles 
    const articles = $('.rendered_board_article');




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
            imagesList: JSON.stringify(articleImagesUrlList ? articleImagesUrlList.split(",") : articleImagesUrlList),
        
           
            
           
        })
      
      }
    

    
})



app.get('/', (req, res) => {
    res.json(khaleejNewsApi)
   
})


app.get('/news', (req, res) => {
    res.json('here we are')
})

app.listen(process.env.PORT || PORT, 
	() => console.log(`Server is running on PORT ${PORT}...`));