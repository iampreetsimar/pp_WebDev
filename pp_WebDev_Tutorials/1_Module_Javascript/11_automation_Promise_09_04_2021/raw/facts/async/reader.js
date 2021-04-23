let fs = require("fs");
console.log("Before")

// Sync blocks the control till the time data is not returned 
// let data = fs.readFileSync("f1.txt");
// We'll use an async version and pass a callback function which runs when we get the result
// This way control is not blocked and other work can be done till the time file is not yet returned
// The callback function will run only after the all the other work will be done
// db queries, reading files, network requests, image processing - usage of async calls
fs.readFile("f1.txt", cb);
function cb(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log("Content: " + data);
    } 
}

console.log("After");
console.log("Other work");

