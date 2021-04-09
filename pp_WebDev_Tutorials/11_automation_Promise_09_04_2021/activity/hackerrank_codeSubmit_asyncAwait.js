let puppeteer = require("puppeteer");
let { email, password } = require("../credential");
let { challenges } = require("./warmUpChallenges_codes");

console.log("Before");

(async function() {
    try {
        let browserInstance = await puppeteer.launch({ 
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
    
        // same tab
        let tab = await browserInstance.pages();
        tab = tab[0];
        // open hackerrank login page
        await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    
        // type email into input field
        console.log("...typing email");
        await tab.type("#input-1", email, { delay: 100 });
    
        // type password into input field
        console.log("...typing password");
        await tab.type("#input-2", password, { delay: 100 });
    
        // click on login button
        console.log("...clicked on login button");
        await tab.click("button[data-analytics='LoginPassword']");
    
        console.log("Login Successful,", "Home Page Opened,", "...clicked on interview prep button");
        await waitAndClick("#base-card-1-link", tab);
    
        console.log("Interview Preparation Page Opened,", "...clicked on warm up challenges");
        await waitAndClick("a[data-attr1='warmup']", tab);
    
        console.log("Warm Up Challenges Page Opened,", "...clicking on individual warm up challenge questions");
        // returns current module page url
        let url = tab.url();
    
        for(let  i = 0; i < challenges.length; i++) {
            await codeSubmitter(url, challenges[i].code, challenges[i].questionName, tab);
        }
    
        console.log("All challenges submitted");
        setTimeout(function() {
            // close browser instance
            // instance.close();
            console.log("Browser Instance Closed");
        }, 5000);
    } catch(err) {
        console.log(err);
    }
})();

console.log("After");


// CUSTOM ASYNC FUNCTION TO WAIT FOR SELECTOR AND CLICK ON IT
async function waitAndClick(selector, tab) {
    await tab.waitForSelector(selector, { visible: true });

    // not awaiting this, calling function will await for this promise's resolution
    let waitForSelectorClick = tab.click(selector, { delay: 500 });
    return waitForSelectorClick;
}

// CUSTOM ASYNC FUNCTION TO SUBMIT CODE 
// <INPUT> url of the module page, the code to be submitted for the challenge, the question name
async function codeSubmitter(modulePageURL, code, questionName, tab) {
    // visit module challenges page
    let modulePagePromise = await tab.goto(modulePageURL);
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
        })
}