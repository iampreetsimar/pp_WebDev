let puppeteer = require("puppeteer");

// browser launches
let browserPromise = puppeteer.launch({
    headless:false
});

// browserPromise.then(function(browserInstance) {
//     // new tab
//     let newPagePromise = browserInstance.newPage();

//     newPagePromise.then(function(newPage) {
//         console.log("New Tab opened");

//         // go to youtube.com
//         let goToUrlPromise = newPage.goto("https://www.youtube.com");

//         goToUrlPromise.then(function() {
//             console.log("Url reached");

//             setTimeout(function() {
//                 browserInstance.close();
//                 console.log("Browser Instance closed");
//             }, 3000);
//         })


//     })
// })

// instead of nesting, we can do chaining to improve readability

browserPromise.then(function(browserInstance) {

    // new tab
    let newPagePromise = browserInstance.newPage();
    return newPagePromise;

}).then(function(newPage) {

    console.log("New Tab opened");
    // go to youtube.com
    let goToUrlPromise = newPage.goto("https://www.youtube.com");
    return goToUrlPromise;

}).then(function() {
    console.log("Url reached");
}).catch(function() {
    console.log(err);
})



