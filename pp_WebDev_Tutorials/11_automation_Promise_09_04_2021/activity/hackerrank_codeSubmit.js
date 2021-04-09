let puppeteer = require("puppeteer");
let { email, password } = require("../credential");
let { challenges } = require("./warmUpChallenges_codes");
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
        console.log("Warm Up Challenges Page Opened,", "...clicking on individual warm up challenge questions");
        // returns current module page url
        return tab.url();
    }).then(function(url) {
        let challengesObject = challenges[0];
        let codeSubmitPromise = codeSubmitter(url, challengesObject.code, challengesObject.questionName);
        return codeSubmitPromise;
    }).then(function() {
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
// <INPUT> url of the module page, the code to be submitted for the challenge, the question name
function codeSubmitter(modulePageURL, code, questionName) {
    return new Promise(function(resolve, reject) {
        
        // visit module challenges page
        let modulePagePromise = tab.goto(modulePageURL);
        modulePagePromise
            .then(function() {

                // from page -> select all h4 elements having question names -> get matched question name -> click on the question card
                // evaluate will be executed inside browser console
                function browserConsoleFunction(questionName) {
                    let questionElement = document.querySelectorAll("h4");
                    let questionNamesArr = [];
                    for(let i = 0; i < questionElement.length; i++) {
                        let qName = questionElement[i].innerText.split("\n")[0];
                        questionNamesArr.push(qName);
                    }

                    let idx = questionNamesArr.indexOf(questionName);
                    questionElement[idx].click();
                };

                // evaluate takes the function to be run in console + arguments to pass to the said function
                let challengePageClickPromise = tab.evaluate(browserConsoleFunction, questionName);
                return challengePageClickPromise;
            })
            
            // this part of code will run fine in Windows but not on MAC - Any keyboard event with Ctrl will not work
            .then(function() {
                // click on checkbox
                let inputWillBeClickedPromise = waitAndClick(".custom-checkbox.inline");
                return inputWillBeClickedPromise;
            }).then(function () {
                // type the code 
                let codeWillBeTypedPromise = tab.type(".custominput", code);
                return codeWillBeTypedPromise;
            }).then(function () {
                // hold down Control
                let holdControlDownPromise = tab.keyboard.down("Control");
                return holdControlDownPromise;
            }).then(function () {
                // Press ctrl a
                let pressApromise = tab.keyboard.press("a");
                return pressApromise;
            }).then(function () {
                // Press ctrl x to cut code typed in input
                let cutPromise = tab.keyboard.press("x");
                return cutPromise;
            }).then(function () {
                // editor will be clicked
                let editorWillBeClickedPromise = tab.click(".monaco-editor.no-user-select.vs");
                return editorWillBeClickedPromise;
            }).then(function () {
                // press ctrl a to select all code already present
                let aisPressedpromise = gtab.keyboard.press("a");
                return aisPressedpromise;
            })
            .then(function () {
                // press ctrl v to paste the code selected from input
                let pastePromise = gtab.keyboard.press("v");
                return pastePromise;
            })
            .then(function () {
                // click submit code button
                let submitIsClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                return submitIsClickedPromise;
            }).then(function() {
                resolve();
            }).catch(function() {
                reject();
            })
    });
}