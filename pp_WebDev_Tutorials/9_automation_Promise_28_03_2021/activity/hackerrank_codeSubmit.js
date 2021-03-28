let puppeteer = require("puppeteer");
let { email, password } = require("../credential");
let tab, instance;

console.log("Before");

let browserPromise = puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });

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
        console.log("...typing email");
        let emailTypedPromise = tab.type("#input-1", email, { delay: 100 });
        return emailTypedPromise;
    }).then(function() {
        // type password into input field
        console.log("...typing password");
        let passwordTypedPromise = tab.type("#input-2", password, { delay: 100 });
        return passwordTypedPromise;
    }).then(function() {
        // click on login button
        console.log("...clicked on login button");
        let loginButtonClickedPromise = tab.click("button[data-analytics='LoginPassword']");
        return Promise.all([
            loginButtonClickedPromise, 

            /*
                waitUntil - load, domcontentloaded, networkidle0, networkidle2
                mostly used - networkidle0 - normal sites
                              networkidle2 - realtime sites, social media sites where data is updated at all times
            */

            tab.waitForNavigation({ waitUntil: "networkidle0" })
        ]);
    }).then(function() {
        console.log("Login Successful");
        console.log("Home Page Opened");
        return tab.mouse.wheel({ deltaY: 300 });
    }).then(function() {
        console.log("...clicked on interview prep button");
        let interviewPrepCardClickedPromise = tab.click("#base-card-1-link", { delay: 200 });
        return Promise.all([
            interviewPrepCardClickedPromise, 
            tab.waitForNavigation({waitUntil: "networkidle0"}),
            tab.waitForSelector("a[data-attr1='warmup']")
        ]);
    }).then(function() {
        console.log("Interview Preparation Page Opened");  
        return tab.mouse.wheel({ deltaY: 200 });
    }).then(function() {
        console.log("...clicked on warm up challenges");
        let warmUpChallengePageClickPromise = tab.click("a[data-attr1='warmup']", { delay: 200 });
        return Promise.all([
            warmUpChallengePageClickPromise, 
            tab.waitForNavigation({waitUntil: "networkidle0"}), 
            tab.waitForSelector("a[data-attr1='sock-merchant']")
        ]);
    }).then(function() {
        console.log("Warm Up Challenges Page Opened");
        return tab.mouse.wheel({ deltaY: 200 });
    }).then(function() {
        console.log("...clicked on warm up sort by match challenge");
        let warmUpChallenge1Promise = tab.click("a[data-attr1='sock-merchant']", { delay: 200 });
        return Promise.all([
            warmUpChallenge1Promise, 
            tab.waitForNavigation({ waitUntil: "networkidle0" }),
            tab.waitForSelector("div[data-attr2='Editorial']")
        ]);
    }).then(function() {
        console.log("Sales By Match Challenge Page Opened");
        return tab.mouse.wheel({ deltaY: 200 });
    })
    // .then(function() {
    //     console.log("...clicked on sort by match challenge editorial tab");
    //     let salesByMatchChallengeEditorialClickedPromise = tab.click("div[data-attr2='Editorial']", { delay: 200 });
    //     return Promise.all([
    //         salesByMatchChallengeEditorialClickedPromise, 
    //         tab.waitForNavigation({ waitUntil: "networkidle0" }),
    //         tab.waitForSelector("button[class='ui-btn ui-btn-normal ui-btn-primary ui-btn-styled']")
    //     ]);
    // }).then(function() {
    //     console.log("Sales By Match Challenge Editorial Opened");
    //     return tab.mouse.wheel({ deltaY: 500 });
    // })
    .then(function() {
        setTimeout(function() {
            // close browser instance
            instance.close();
            console.log("Browser Instance Closed");
        }, 5000);
    }).catch(function(err) {
        console.log(err);
    });

console.log("After");
