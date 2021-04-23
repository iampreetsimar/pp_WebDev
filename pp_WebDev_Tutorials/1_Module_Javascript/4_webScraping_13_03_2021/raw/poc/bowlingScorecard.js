let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");

console.log("Before");
request(url, cb);
function cb(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        extractBowlersFromScorecard(body);
        extractBowlerWithMaxWicketsFromScorecard(body);
    }
}

function extractBowlersFromScorecard(body) {
    // get bowling tables
    // get all bowler names, wickets
    // compare wickets

    let selectorTool = cheerio.load(body);
    let bowlingTables = selectorTool(".table.bowler");

    for(let i = 0; i < bowlingTables.length; i++) {
        // find(el) - extract elements
        let singleInningBowlers = selectorTool(bowlingTables[i]).find("tbody tr");
        for(let j = 0; j < singleInningBowlers.length; j++) {
            let allStats = selectorTool(singleInningBowlers[j]).find("td");
            let bowlerName = selectorTool(allStats[0]).text();
            let wickets = selectorTool(allStats[4]).text();
            console.log("Name: ", bowlerName, " | ", "Wickets: ", wickets);

        }
        console.log("\n------------------------------------------\n");
    }
}

function extractBowlerWithMaxWicketsFromScorecard(body) {
    // get bowling tables
    // get all bowler names, wickets
    // compare wickets

    let selectorTool = cheerio.load(body);
    let bowlingTables = selectorTool(".table.bowler");
    const bowlerArr = [];
    for(let i = 0; i < bowlingTables.length; i++) {
        // find(el) - extract elements
        let singleInningBowlers = selectorTool(bowlingTables[i]).find("tbody tr");
        for(let j = 0; j < singleInningBowlers.length; j++) {
            let allStats = selectorTool(singleInningBowlers[j]).find("td");
            let bowlerName = selectorTool(allStats[0]).text();
            let wickets = selectorTool(allStats[4]).text();
            bowlerArr.push({name: bowlerName, wickets: parseInt(wickets)});
        }
    }

    const resulArr = extractMaxWicket(bowlerArr);
    console.log(resulArr);
}

function extractMaxWicket(arr) {
    let max = 0;
    for(let i in arr) {
        if(arr[i].wickets > arr[max].wickets) {
            max = i;
        }
    }

    return arr[max];
}

console.log("After");