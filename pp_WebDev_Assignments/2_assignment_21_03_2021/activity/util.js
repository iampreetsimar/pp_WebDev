let path = require("path")
let fs = require("fs");

let mainDir = "./ipl2020"

function createTeamsDirectory(teamName) {
    if(!fs.existsSync(mainDir)) {
        fs.mkdirSync(mainDir);
        console.log(mainDir, " was created");
    }

    let teamdirPath = path.join(mainDir, teamName);
    if(!fs.existsSync(teamdirPath)) {
        fs.mkdirSync(teamdirPath);
        console.log(teamdirPath, " was created");
    }
}

function writeDataToJsonFile(playerObj, teamName) {
    let playerName = playerObj[0].playerName.replaceAll(" ", "");
    let filePath = path.join(mainDir, teamName, playerName + ".json");

    try {
        // if file  - read data first -> update it -> store it again
        let contentRead = JSON.parse(fs.readFileSync(filePath));
        contentRead.push(playerObj[0]);
        fs.writeFileSync(filePath, JSON.stringify(contentRead, null, 4));
        console.log(filePath, "was saved");
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            // if file not found - create file and write the data
            fs.writeFileSync(filePath, JSON.stringify(playerObj, null, 4));
            console.log(filePath, "was created and saved");
            return;
        }
        console.log(err);
    }
    
}

module.exports = {
    createTeamsDirectory: createTeamsDirectory,
    writeDataToJsonFile: writeDataToJsonFile
}