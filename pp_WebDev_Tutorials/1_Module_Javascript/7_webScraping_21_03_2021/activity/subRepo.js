let cheerio = require("cheerio");
let request = require("request");
let { getSubRepoIssuesRequest } = require("./issues");
let { createSubRepoFiles, createTopicDirectory } = require("./util");

let githubUrl = "https://github.com";

function getSubReposRequest(topicsHref) {
    request(topicsHref, function(err, response, body) {
        if(err) {
            console.log(err);
        } else {
            extractSubRepo(body);
        }
    })
}

function extractSubRepo(body) {
    let selTool = cheerio.load(body);
    let topicName = selTool(".h1-mktg").text().trim();
    createTopicDirectory(topicName);
    let subRepos = selTool(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");
    for(let i = 0; i < 8; i++) {        // top 8 subrepo
        let subRepoName = selTool(subRepos[i]).text().trim();
        let subRepoUrl = githubUrl + selTool(subRepos[i]).attr("href");
        createSubRepoFiles(topicName, subRepoName);
        getSubRepoIssuesRequest(topicName, subRepoName, subRepoUrl);
    }
}

module.exports = {
    getSubReposRequest: getSubReposRequest
}