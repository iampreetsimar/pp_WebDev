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

        // go back to module page
        await tab.goto(url);

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
    await tab.goto(modulePageURL);

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
    await tab.evaluate(browserConsoleFunction, questionName);
    
    // this part of code will run fine in Windows but not on MAC - Any keyboard event with Ctrl will not work
        
    await waitAndClick(".custom-checkbox.inline", toolbar); 

    // type the code 
    await tab.type(".custominput", code);

    // hold down Control
    await tab.keyboard.down("Control");

    // Press ctrl a
    await tab.keyboard.press("a");

    // Press ctrl x to cut code typed in input
    await tab.keyboard.press("x");

    // editor will be clicked
    await tab.click(".monaco-editor.no-user-select.vs");

    // press ctrl a to select all code already present
    await gtab.keyboard.press("a");
    
    // press ctrl v to paste the code selected from input
    await gtab.keyboard.press("v");

    // click submit code button
    await gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");

    // hold Control up
    return tab.keyboard.up("Control");
}