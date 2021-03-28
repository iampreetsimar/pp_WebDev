let fs = require("fs");

console.log("Before");

let p1 = fs.promises.readFile("f1.txt");
let p2 = fs.promises.readFile("f2.txt");
let p3 = fs.promises.readFile("f3.txt");

// pass the promises in an array to Promise.all
// when all these promises will be done - Promise.all then will be run
let combinedPromise = Promise.all([
    p1, p2, p3
]);

// data is present in the array in the same order in which individual promises were added
combinedPromise.then(function(data) {
    data.forEach(element => {
        console.log(element + "");
    });
})

console.log("After");