let request = require("request");
let cheerio = require("cheerio");
let { getSubReposRequest } = require("./subRepo");

let githubUrl = "https://github.com";
let topicsAddress = "/topics";

function getTopicsRequest() {
    request(githubUrl + topicsAddress, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractTopics(body);
        }
    })
}

function extractTopics(body) {
    let selTool = cheerio.load(body);
    let topics = selTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i = 0; i < topics.length; i++) {
        let topicsHref = githubUrl + selTool(topics[i]).attr("href");
        getSubReposRequest(topicsHref);
    }
}

module.exports = {
    getTopicsRequest: getTopicsRequest
}