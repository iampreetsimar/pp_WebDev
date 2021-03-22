let path = require("path")
let fs = require("fs");

let mainDir = "./ipl2020"

function createTeamsDirectory(teams) {
    if(!fs.existsSync(mainDir)) {
        fs.mkdirSync(mainDir);
        console.log(mainDir, " was created");
    }

    
}

module.exports = {
    createTeamsDirectory: createTeamsDirectory
}