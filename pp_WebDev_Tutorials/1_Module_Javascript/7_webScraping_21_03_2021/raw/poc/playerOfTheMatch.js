let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

let request = require("request");
let cheerio = require("cheerio");

console.log("Before");

request(url, cb);
function cb(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        // extractHtmlParallel(body);
        extractHtmlSerial(body);
    }
}

function extractHtmlParallel(body) {
    let selTool = cheerio.load(body);
    let matchCards = selTool(".match-score-block");
    for(let i = 0; i < matchCards.length; i++) {
        let scoreCardLink = selTool(matchCards[i]).find("a[data-hover=\"Scorecard\"]").attr("href");
        let homeLink = "https://www.espncricinfo.com";
        let fullScoreCardLink = homeLink + scoreCardLink;
        getPlayerOfTheMatchParallel(fullScoreCardLink);
    }
}

function extractHtmlSerial(body) {
    let selTool = cheerio.load(body);
    let matchCards = selTool(".match-score-block");
    getPlayerOfTheMatchSerial(matchCards, 0, selTool);
}

function getPlayerOfTheMatchParallel(url) {
    request(url, cb);
    function cb(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractPlayerOfTheMatch(body);
        }
    }
}

function getPlayerOfTheMatchSerial(arr, idx, selTool) {
    if(idx == arr.length) {
        return;
    }

    let scoreCardLink = selTool(arr[idx]).find("a[data-hover=\"Scorecard\"]").attr("href");
    let homeLink = "https://www.espncricinfo.com";
    let fullScoreCardLink = homeLink + scoreCardLink;
    request(fullScoreCardLink, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractPlayerOfTheMatch(body);
            getPlayerOfTheMatchSerial(arr, idx + 1, selTool);
        }
    });
}

function extractPlayerOfTheMatch(body) {
    let selTool = cheerio.load(body);
    let bestPlayerName = selTool(".best-player-name").text();
    let bestPlayerTeamName = selTool(".best-player-team-name").text();
    console.log(bestPlayerName + " - " + bestPlayerTeamName);
}