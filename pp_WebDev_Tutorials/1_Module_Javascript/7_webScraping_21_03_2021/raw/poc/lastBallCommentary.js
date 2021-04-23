let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/sri-lanka-tour-of-west-indies-2020-21-1252062/west-indies-vs-sri-lanka-2nd-odi-1252070/ball-by-ball-commentary";

console.log("Before");
request(url, cb);
function cb(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        //console.log(body);
        extractHTML(body);
    }
}

function extractHTML(body) {
    let selectorTool = cheerio.load(body);
    let allCommentaries = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");

    // not all Commentaries all loaded initially when request is made
    // we'll look into this during browser activity
    console.log(allCommentaries.length);

    // RULE -> whenever  we want to extract info from an index, wrap it first with the selectorTool
    // cheerio functionality
    let lastBallComment = selectorTool(allCommentaries[0]).text();
    console.log(lastBallComment);
}

console.log("After");