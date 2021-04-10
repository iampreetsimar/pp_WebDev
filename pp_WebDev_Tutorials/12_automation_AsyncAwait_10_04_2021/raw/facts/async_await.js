let fs = require("fs");

console.log("Before");

/*
    * js will execute the async function normally.
    * As soon as await comes, any code after that behaves like a then
    * Main thread should not be blocked, so any code after the function will run first
        - and when promise is resolved, any code after await in the async function will run

    * Async function will wait for await but JS stack will not
    * Async await is a syntax sugar to consume promises
    * Await will work in async function only
    * Await is an alternative for then
*/

(async function() {
    let prom = fs.promises.readFile("f1.txt");
    console.log("Before Adding await");
    let data = await prom;
    console.log("Data: " + data);
    console.log("After reading file 1");
    data = await fs.promises.readFile("f2.txt");
    console.log("Data: " + data);
    console.log("After reading file 2");
})();

// works similar to first
// bad practice to use then type function of promise in an async function
(async function() {
    let prom = fs.promises.readFile("f1.txt");
    console.log("Before Adding await - Promise");
    prom.then(function(data) {
        console.log("Promise - Data: " + data);
        console.log("After reading file 1 - Promise");
        return fs.promises.readFile("f2.txt");
    }).then(function(data) {
        console.log("Promise - Data: " + data);
        console.log("After reading file 2 - Promise");
    })
})();

console.log("After");
console.log("Other");

