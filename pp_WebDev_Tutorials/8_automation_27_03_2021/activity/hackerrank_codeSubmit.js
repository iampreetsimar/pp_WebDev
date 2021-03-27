let puppeteer = require("puppeteer");
let { email, password } = require("../credential");
let tab, instance;

console.log("Before");

let browserPromise = puppeteer.launch({ headless: false });

browserPromise
    .then(function(browserInstance) {
        instance = browserInstance;
        // return is necessary - if not present, next then will execute immediately
        // pages returns promise of list of all tabs
        return browserInstance.pages();
    }).then(function(newTab) {
        // open hackerrank login page
        let openLoginPagePromise = newTab[0].goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        tab = newTab[0];
        return openLoginPagePromise;
    }).then(function() {
        // type email into input field
        let emailTypedPromise = tab.type("#input-1", email, {delay: 100});
        return emailTypedPromise;
    }).then(function() {
        // type password into input field
        let passwordTypedPromise = tab.type("#input-2", password, {delay: 100});
        return passwordTypedPromise;
    }).then(function() {
        // click on login button
        let loginButtonClickedPromise = tab.click("button[data-analytics='LoginPassword']");
        return loginButtonClickedPromise;
    }).then(function() {
        console.log("Login Successful");
    }).then(function() {
        setTimeout(function() {
            // close browser instance
            instance.close();
            console.log("Browser Instance Closed");
        }, 5000);
    }).catch(function(err) {
        console.log(err);
    });

console.log("After");