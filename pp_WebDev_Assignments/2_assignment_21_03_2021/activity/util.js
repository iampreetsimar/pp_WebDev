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

    if(!fs.existsSync(filePath)) {
        createJsonFile(filePath);
        fs.writeFile(filePath, JSON.stringify(playerObj, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(filePath, "was saved"); 
            }
        });   
    } else {
        let playerArray = readDataFromJsonFile(filePath);
        playerArray.push(playerObj[0]);
        fs.writeFile(filePath, JSON.stringify(playerArray, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(filePath, "was saved"); 
            }
        }); 
    }
}

function createJsonFile(filePath) {
    let filestream = fs.createWriteStream(filePath);
    filestream.end();
    console.log(filePath, "was created");
}

function readDataFromJsonFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath));
}

module.exports = {
    createTeamsDirectory: createTeamsDirectory,
    writeDataToJsonFile: writeDataToJsonFile
}