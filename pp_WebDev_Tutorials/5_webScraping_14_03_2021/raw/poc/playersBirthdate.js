let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");
let { getBatsmanBirthday } = require("./getBirthday");

console.log("Before");

request(url, cb);
function cb(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        extractPlayersFromScorecard(body);
    }
}

function extractPlayersFromScorecard(body) {
    let selectorTool = cheerio.load(body);
    let teamNameElemArr = selectorTool(".Collapsible h5");

    // extract team names
    let teamNameArr = []
    for(let i = 0; i < teamNameElemArr.length; i++) {
        let teamName = selectorTool(teamNameElemArr[i]).text();
        teamName = teamName.split("INNINGS")[0].trim();
        teamNameArr.push(teamName);
    }

    // extract player names and their profile url
    // use the url to extract their birthday
    let batsmanTableElemArr = selectorTool(".table.batsman");
    let batsmanArr = []
    for(let i = 0; i < batsmanTableElemArr.length; i++) {
        let teamRows = selectorTool(batsmanTableElemArr[i]).find("tbody tr td a");
        for(let j = 0; j < teamRows.length; j++) {
            let batsmanName = selectorTool(teamRows[j]).text();
            if(batsmanName.search("c"))
                batsmanName = batsmanName.replace("(c)", "").trim();
            
            if(batsmanName.search("†"))
                batsmanName = batsmanName.replace("†", "").trim();
            
            let batsmanProfileUrl = selectorTool(teamRows[j]).attr("href").trim();
            getBatsmanBirthday(batsmanName, teamNameArr[i], batsmanProfileUrl);


            // batsmanArr.push({
            //     name: batsmanName,
            //     team: teamNameArr[i],
            //     profileUrl: batsmanProfileUrl
            // });
        }
    }

    //console.log(batsmanArr);
}

console.log("After");