// npm init -y
// npm install request

let request = require("request");
let cheerio = require("cheerio");
console.log("Before");

request("https://www.google.com", cb);
function cb(err, response, body) {
    if(err) {
        console.log(err);
    } else {
        // console.log("HTML Response: \n");
        // console.log(body);

        extractHTML(body);
    }
}

function extractHTML(body) {
    // load html body to cheerio to get a selectorTool object
    let selectorTool = cheerio.load(body);

    // search the element
    let selectorElem = selectorTool("#SIvCob");

    // text() - returns plain text
    console.log(selectorElem.text());

    // html() - return html inside the selectorElem
    console.log(selectorElem.html());
}

console.log("After");