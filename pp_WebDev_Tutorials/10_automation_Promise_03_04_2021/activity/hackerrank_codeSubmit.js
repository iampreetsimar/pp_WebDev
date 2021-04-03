let puppeteer = require("puppeteer");
let { email, password } = require("../credential");
let { sockmerchant } = require("./warmUpChallenges_codes");
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

        // added code refactoring tp use CUSTOM PROMISE
        // return Promise.all([
        //     loginButtonClickedPromise, 

        //     /*
        //         waitUntil - load, domcontentloaded, networkidle0, networkidle2
        //         mostly used - networkidle0 - normal sites
        //                       networkidle2 - realtime sites, social media sites where data is updated at all times
        //     */

        //     tab.waitForNavigation({ waitUntil: "networkidle0" }),
        // ]);

        return loginButtonClickedPromise;

    }).then(function() {
        console.log("Login Successful,", "Home Page Opened,", "...clicked on interview prep button");
        let interviewPrepCardClickedPromise = waitAndClick("#base-card-1-link");
        return interviewPrepCardClickedPromise;
    }).then(function() {
        console.log("Interview Preparation Page Opened,", "...clicked on warm up challenges");
        let warmUpChallengePageClickPromise = waitAndClick("a[data-attr1='warmup']");
        return warmUpChallengePageClickPromise;
    }).then(function() {
        console.log("Warm Up Challenges Page Opened,", "...clicked on warm up sort by match challenge");
        let warmUpChallengePromise = waitAndClick("a[data-attr1='sock-merchant']");
        return warmUpChallengePromise;
    }).then(function() {
        console.log("Sales By Match Challenge Page Opened,", "...selecting editor code");
        let codeEditorPromise = waitAndClick(".view-lines");
        return codeEditorPromise;
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

    // .then(function() {
    //     let codeSubmitPromise = codeSubmitter();
    //     return codeSubmitPromise;
    // }).then(function(codeSubmitStatus) {
    //     console.log(codeSubmitStatus);
    // })

    .then(function() {
        setTimeout(function() {
            // close browser instance
            //instance.close();
            console.log("Browser Instance Closed");
        }, 5000);
    }).catch(function(err) {
        console.log(err);
    });

console.log("After");


// CUSTOM PROMISE TO WAIT FOR SELECTOR AND CLICK ON IT
function waitAndClick(selector) {
    return new Promise(function(resolve, reject) {
        let waitForSelectorPromise = tab.waitForSelector(selector, { visible: true });
        waitForSelectorPromise
            .then(function() {
                let waitForSelectorClick = tab.click(selector, { delay: 500 });
                return waitForSelectorClick;
            }).then(function() {
                resolve();
            }).catch(function() {
                reject();
            })
    })
}

// CUSTOM PROMISE TO SUBMIT CODE
function codeSubmitter() {
    return new Promise(function(resolve, reject) {
        try {
            let status = submitCode();
            resolve(status);
        } catch {
            reject(err);
        }
    });
}

