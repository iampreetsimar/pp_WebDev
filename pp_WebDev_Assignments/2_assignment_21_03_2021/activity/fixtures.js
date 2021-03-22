let request = require("request");
let cheerio = require("cheerio");
let { getMatchDetailsRequest } = require("./match");

let espnUrl = "https://www.espncricinfo.com";

function getFixtureDetailRequest(url) {
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractFixtureDetails(body);
        }
    })
}

function extractFixtureDetails(body) {
    let selTool = cheerio.load(body);
    let scorecardDivs = selTool(".match-cta-container a[data-hover = \"Scorecard\"]");
    for(let i = 0; i < 1; i++) {
        let matchHref = selTool(scorecardDivs[i]).attr("href");
        getMatchDetailsRequest(espnUrl + matchHref);
    }
}

module.exports = {
    getFixtureDetailRequest: getFixtureDetailRequest
}