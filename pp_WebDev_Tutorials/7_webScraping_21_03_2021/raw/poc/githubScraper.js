` 
    - Scrap from Github Topics
    - Fetch Top 3 Topics and make their folders
    - Fetch their top 8 repositories and make their json files
    - Go to issues for each repo and add the issue and its href link to the respective json file
`

let url = "https://github.com/topics";

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdf = require("pdfkit")

request(url, function(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        extractHtml(body);
    }
})

function extractHtml(body) {
    let selTool = cheerio.load(body);
    let topCards = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    for(let i = 0; i < topCards.length; i++) {
        let subTopicHref = "https://github.com" + selTool(topCards[i]).find("a").attr("href");
        getSubRepos(subTopicHref)
    }
}

function getSubRepos(url) {
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractTopSubRepos(body);
        }
    })
}

function extractTopSubRepos(body) {
    let selTool = cheerio.load(body);
    let topicName = selTool(".h1-mktg").text().trim();
    let subRepos = selTool(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");
    createDirectory(topicName);
    for(let i = 0; i < 8; i++) {
        let subRepoHref = "https://github.com" + selTool(subRepos[i]).attr("href");
        createJSONfiles(path.basename(subRepoHref), topicName);
        getSubRepoIssues(subRepoHref, topicName);
    }
}

function createDirectory(topicName) {
    let mainPath = "./Github-Scraper";
    if(!fs.existsSync(mainPath)) {
        fs.mkdirSync(mainPath);
        console.log("Github-Scraper directory created");
    }

    let dirPath = path.join(mainPath, topicName);
    if(!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(path.basename(dirPath) + " directory was created");
    }
}

function createJSONfiles(subRepoName, topicName) {
    let filePath = path.join("./Github-Scraper", topicName, subRepoName + ".json");
    if(!fs.existsSync(filePath)) {
        var filestream = fs.createWriteStream(filePath);
        filestream.end();
        console.log(path.basename(filePath) + " was created");
    }
}

function getSubRepoIssues(subRepoHref, topicName) {
    let subRepoUrl = subRepoHref + "/issues";
    request(subRepoUrl, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractIssues(body, path.basename(subRepoHref) + ".json", topicName)
        }
    })
}

function extractIssues(body, fileName, topicName) {
    let selTool = cheerio.load(body);
    let issues = selTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let jsonObj = [];
    //console.log(fileName);
    for(let i = 0; i < issues.length; i++) {
        let issueName = selTool(issues[i]).text().trim();
        let issueLink = "https://github.com" + selTool(issues[i]).attr("href");
        //console.log(issueName, " - ", issueLink);
        jsonObj.push({
            issueName: issueName,
            issueHref: issueLink
        })
    }

    writeToFiles(jsonObj, fileName, topicName);
}

function writeToFiles(jsonObj, fileName, topicName) {
    let jsonFilePath = path.join("./Github-Scraper", topicName, fileName);
    let data = JSON.stringify(jsonObj, null, 4)

    // json files
    fs.writeFile(jsonFilePath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(fileName + " was saved!");
    }); 

    // pdf files
    let pdfDoc = new pdf();
    let pdfFileName = path.basename(fileName).split(".")[0] + ".pdf";
    let pdfFilePath = path.join("./Github-Scraper", topicName, pdfFileName)
    pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
    pdfDoc.text(data);
    pdfDoc.end();
    console.log(pdfFileName + " was saved!");
}