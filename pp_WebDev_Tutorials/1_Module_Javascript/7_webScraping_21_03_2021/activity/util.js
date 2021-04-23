let mainDir = "./github-scraper";

let path = require("path");
let fs = require("fs");
let pdf = require("pdfkit");

function createTopicDirectory(topicName) {
    if(!fs.existsSync(mainDir)) {
        fs.mkdirSync(mainDir);  // creating activity directory
        console.log(mainDir, " directory was created");
    }

    // creating topics directory
    let topicDir = path.join(mainDir, topicName);
    if(!fs.existsSync(topicDir)) {
        fs.mkdirSync(topicDir);
        console.log(topicDir, " directory was created");
    }
}

function createSubRepoFiles(topicName, subRepoName) {
    let filePath = path.join(mainDir, topicName, path.basename(subRepoName) + ".json");
    if(!fs.existsSync(filePath)) {
        var filestream = fs.createWriteStream(filePath);
        filestream.end();
        console.log(filePath, " was created");
    }
}

function writeJsonToFile(jsonData, topicName, subRepoName) {
    let filePath = path.join(mainDir, topicName, path.basename(subRepoName) + ".json");
    let data = JSON.stringify(jsonData, null, 4);

    fs.writeFile(filePath, data, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(filePath, " was saved");
        }
    })
}

function createPdfFile(jsonData, topicName, subRepoName) {
    let pdfDoc = new pdf();
    let fileName = path.basename(subRepoName) + ".pdf";
    let filePath = path.join(mainDir, topicName, fileName)
    let data = JSON.stringify(jsonData, null, 4);

    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(data);
    pdfDoc.end();
    console.log(filePath + " was saved!");
}

module.exports = {
    createSubRepoFiles: createSubRepoFiles,
    createTopicDirectory: createTopicDirectory,
    writeJsonToFile: writeJsonToFile,
    createPdfFile: createPdfFile
}