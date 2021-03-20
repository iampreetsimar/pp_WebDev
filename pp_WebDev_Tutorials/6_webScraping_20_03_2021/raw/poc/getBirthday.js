let request = require("request");
let cheerio = require("cheerio");

function getBatsmanBirthday(playerName, playerTeam, playerProfileUrl) {
    request(playerProfileUrl, cb);
    function cb(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractBirthday(body, playerName, playerTeam);
        }
    }
}

function extractBirthday(body, playerName, playerTeam) {
    let selectorTool = cheerio.load(body);
    let playerInformation = selectorTool(".ciPlayerinformationtxt span");
    let birthdayDetails = selectorTool(playerInformation[1]).text();
    let birthday = birthdayDetails.split(",").slice(0,2).join(",").trim();
    console.log(playerName, "\t", playerTeam, "\t", birthday);
}

module.exports = {
    getBatsmanBirthday: getBatsmanBirthday
}