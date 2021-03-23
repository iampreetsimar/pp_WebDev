let request = require("request");
let cheerio = require("cheerio");
let { createTeamsDirectory, writeDataToJsonFile } = require("./util");


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

    let matchDescription = selTool(".col-16.col-md-16.col-lg-12.main-content-x .description").text().trim().split(",");
    let matchDate = matchDescription[2].trim();
    let matchVenue = matchDescription[1].trim();
    let match = matchDescription[0].trim();
    let matchResult = selTool(".col-16.col-md-16.col-lg-12.main-content-x .status-text").text().trim();


    let teamsArray = []
    for(let i = 0; i < teams.length; i++) {
        let teamName = selTool(teams[i]).text().trim();
        teamsArray.push(teamName);
        createTeamsDirectory(teamName);
    }
    
    let batsmenTables = selTool(".table.batsman");
    for(let i = 0; i < batsmenTables.length; i++) {
        let batsmanDetails = selTool(batsmenTables[i]).find("tbody tr");
        for(let j = 0; j < batsmanDetails.length; j += 2) {
            let playerDetails = selTool(batsmanDetails[j]).find("td");
            
            if(playerDetails.length == 8) {
                let playerName = selTool(playerDetails[0]).text().trim();
                if(playerName.search("c"))
                    playerName = playerName.replace("(c)", "").trim();
                if(playerName.search("†"))
                    playerName = playerName.replace("†", "").trim();

                let playerRuns = selTool(playerDetails[2]).text().trim();
                let playerBallsPlayed = selTool(playerDetails[3]).text().trim();
                let fours = selTool(playerDetails[5]).text().trim();
                let sixes = selTool(playerDetails[6]).text().trim();
                let strikeRate = selTool(playerDetails[7]).text().trim();

                let playerObj = [{
                    playerName: playerName,
                    runs: playerRuns,
                    balls: playerBallsPlayed,
                    fours: fours,
                    sixes: sixes,
                    strikeRate: strikeRate,
                    game: match,
                    date: matchDate,
                    venue: matchVenue,
                    matchResult: matchResult,
                    opponent: teamsArray[1 - i]
                }]

                writeDataToJsonFile(playerObj, teamsArray[i]);
            }
        }
    }
}

module.exports = {
    getMatchDetailsRequest: getMatchDetailsRequest
}