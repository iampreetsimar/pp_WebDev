let request = require("request");
let cheerio = require("cheerio");
let { getFixtureDetailRequest } = require("./fixtures");
let path = require("path");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let espnUrl = "https://www.espncricinfo.com";

function getLeagueDetailsRequest() {
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractLeaguetails(body);
        }
    })
}

function extractLeaguetails(body) {
    let selTool = cheerio.load(body);
    let navLinks = selTool(".jsx-850418440.navbar-nav .nav-link");
    let fixturesHref = selTool(navLinks[1]).attr("href");
    let fixtureUrl = espnUrl + fixturesHref;
    getFixtureDetailRequest(fixtureUrl);
}

module.exports = {
    getLeagueDetailsRequest: getLeagueDetailsRequest
}