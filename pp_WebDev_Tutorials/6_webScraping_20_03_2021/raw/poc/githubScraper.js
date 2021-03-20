` 
    - Scrap from Github Topics
    - Fetch Top 3 Topics
    - Print the topics along with their top 8 repositories
`

let url = "https://github.com/topics";

let request = require("request");
let cheerio = require("cheerio");

request(url, function(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        extractHtml(body);
    }
})

function extractHtml(body) {
    let selTool = cheerio.load(body);
    let topCards = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    for(let i = 0; i < topCards.length; i++) {
        let subTopicHref = "https://github.com" + selTool(topCards[i]).find("a").attr("href");
        getSubRepos(subTopicHref)
    }
}

function getSubRepos(url) {
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractTopSubRepos(body);
        }
    })
}

function extractTopSubRepos(body) {
    let selTool = cheerio.load(body);
    let topicName = selTool(".h1-mktg").text().trim();
    let subRepos = selTool(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");
    console.log("TOPIC : " + topicName);
    for(let i = 0; i < 8; i++) {
        let subRepoHref = "https://github.com" + selTool(subRepos[i]).attr("href");
        console.log(subRepoHref);
    }
    console.log("------------------------\n")
}