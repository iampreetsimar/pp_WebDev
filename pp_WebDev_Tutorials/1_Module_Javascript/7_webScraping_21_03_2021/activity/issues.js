let request = require("request");
let cheerio = require("cheerio");
let { writeJsonToFile, createPdfFile } = require("./util");

let issuesAddress = "/issues";
let githubUrl = "https://github.com";

function getSubRepoIssuesRequest(topicName, subRepoName, subRepoUrl) {
    request(subRepoUrl + issuesAddress, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractSubRepoIssues(body, topicName, subRepoName);
        }
    })
}

function extractSubRepoIssues(body, topicName, subRepoName) {
    let selTool = cheerio.load(body);
    let issues = selTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let jsonData = []
    for(let i = 0; i < issues.length; i++) {
        let issueName = selTool(issues[i]).text().trim();
        let issueHref = githubUrl + selTool(issues[i]).attr("href");
        jsonData.push({
            issueName: issueName,
            issueHref: issueHref
        });
    }

    console.table(jsonData);
    writeJsonToFile(jsonData, topicName, subRepoName);
    createPdfFile(jsonData, topicName, subRepoName);
}

module.exports = {
    getSubRepoIssuesRequest: getSubRepoIssuesRequest
}