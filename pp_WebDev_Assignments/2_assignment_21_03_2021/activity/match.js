let request = require("request");
let cheerio = require("cheerio");

function getMatchDetailsRequest(url) {
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractMatchDetails(body);
        }
    })
}

function extractMatchDetails(body) {
    let selTool = cheerio.load(body);
    let teams = selTool(".name-link .name");
    createTeamsDirectory(teams);

}

module.exports = {
    getMatchDetailsRequest: getMatchDetailsRequest
}