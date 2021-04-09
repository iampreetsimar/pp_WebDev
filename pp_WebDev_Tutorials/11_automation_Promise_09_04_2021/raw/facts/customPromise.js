
let fs = require("fs");

// convert callback to custom promise

// resolve - if work is successful
// reject - if work gives error
function promisifiedReadfile(filePath) {

    // returns pending initially
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, function(err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}


// to achieve
let fReadPromise = promisifiedReadfile("f1.txt");
console.log(fReadPromise);

// resolve - then
fReadPromise.then(function(data) {
    console.log("Resolve - " + data);
})

// reject - catch
fReadPromise.catch(function(err) {
    console.log("Reject - ", err);
})