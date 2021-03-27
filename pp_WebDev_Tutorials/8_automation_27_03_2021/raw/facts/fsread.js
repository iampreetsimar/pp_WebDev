let fs = require("fs");

console.log("Before");

// fs.readFile("f1.txt", function cb(err, data) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data + "");
//     }
// })


// -----------------------------
/*
    Promise is an improvement on callback to do async programming
    Its return initial state is always pending
    State becomes fulfilled after the work is complete

    We get a token promise object where state is pending initially

    A Promise is an object representing the eventual completion or failure of an asynchronous operation. 
    Essentially, a promise is a returned object to which you attach callbacks, 
    instead of passing callbacks into a function.
    
    To consume a promise - Then and catch are async functions.

*/

let promise = fs.promises.readFile("f1.txt", "utf8");
console.log("Initial State ->", promise);
console.log("After");

// setTimeout(function() {
//     console.log("Final State ->", promise);
// }, 2000);

// setTimeout is not a good way to get value from promises. Maybe the file is large, then it would still return pending
// We can use a .then() method provided my promise object
// then is called when promise is fulfilled

// promise.catch() runs if there is some error while processing

promise.then(function(data) {
    console.log(data);
})

promise.catch(function(err) {
    console.log(err);
})


console.log("End");