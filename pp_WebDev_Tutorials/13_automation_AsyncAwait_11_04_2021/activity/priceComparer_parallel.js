let puppeteer = require("puppeteer");
let homepageUrls = ["https://www.amazon.in/", "https://www.flipkart.com/", "https://paytmmall.com/"];
let input = process.argv[2];
console.log("Before");

(async function() {
    try {
        let browserInstance = await puppeteer.launch({ 
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
    
        // fetch listing from amazon
        console.log("***************** AMAZON DETAILS *****************");
        let amazonProductDetails = await getListingFromAmazon(browserInstance, homepageUrls[0], input);
        console.table(amazonProductDetails);
        console.log("**************************************************\n");

        // fetch listing from flipkart
        console.log("***************** FLIPKART DETAILS *****************");
        let flipkartProductDetails = await getListingFromFlipkart(browserInstance, homepageUrls[1], input);
        console.table(flipkartProductDetails);
        console.log("**************************************************\n");

        // fetch listing from paytm mall
        console.log("***************** PAYTM MALL DETAILS *****************");
        let paytmProductDetails = await getListingFromPaytm(browserInstance, homepageUrls[2], input);
        console.table(paytmProductDetails);
        console.log("**************************************************\n");

        
        // close browser instance
        console.log("... closing Browser Instance Closed");
        await browserInstance.close();
    } catch(err) {
        console.log(err);
    }
})();

// INPUT - accepts name, Amazon Home page Url
// OUTPUT - top 5 matching product -> price, name, print on console
async function getListingFromAmazon(browserInstance, url, input) {
    let tab  = await browserInstance.pages();
    tab = tab[0];

    await tab.goto(url);

    // type input into search field
    console.log("...typing product name");
    await tab.type("input[aria-label='Search']", input, { delay: 100 });

    // click on search button
    await tab.click("input[id='nav-search-submit-button']");
    
    // select all div elements
    // evaluate will be executed inside browser console
    function browserConsoleFunction(cardSelector, pNameSelector, priceSelector) {
        let searchedRows = document.querySelectorAll(cardSelector);
        let productDetails = [];
        for(let i = 0; i < 5; i++) {
            let productName = searchedRows[i].querySelector(pNameSelector).innerText;
            let productPrice = searchedRows[i].querySelector(priceSelector).innerText;
            productDetails.push({
                name: productName,
                price: productPrice
            });
        }

        return productDetails;
    };

    // wait for product name and product price in searched page to load
    await tab.waitForSelector("span[class='a-size-medium a-color-base a-text-normal']", { visible: true });
    await tab.waitForSelector("span[class='a-price-whole']", { visible: true });

    // evaluate takes the function to be run in console + arguments to pass to the said function
    prodDetails = await tab.evaluate(browserConsoleFunction, "div[data-component-type='s-search-result']", 
    "span[class='a-size-medium a-color-base a-text-normal']",
    "span[class='a-price-whole']");

    return prodDetails;
}

// INPUT - accepts name, Flipkart Home page Url
// OUTPUT - top 5 matching product -> price, name, print on console
async function getListingFromFlipkart(browserInstance, url, input) {
    let tab  = await browserInstance.newPage();

    await tab.goto(url);

    await tab.waitForSelector("button[class='_2KpZ6l _2doB4z']", { visible: true });
    await tab.click("button[class='_2KpZ6l _2doB4z']");

    await tab.waitForSelector("input[title='Search for products, brands and more']", { visible: true });

    // type input into search field
    console.log("...typing product name");
    await tab.type("input[title='Search for products, brands and more']", input, { delay: 100 });

    // click on search button
    await tab.click("button[class='L0Z3Pu']");
    
    // select all div elements
    // evaluate will be executed inside browser console
    function browserConsoleFunction(cardSelector, pNameSelector, priceSelector) {
        let searchedRows = document.querySelectorAll(cardSelector);
        let productDetails = [];
        for(let i = 0; i < 5; i++) {
            let productName = searchedRows[i].querySelector(pNameSelector).innerText;
            let productPrice = searchedRows[i].querySelector(priceSelector).innerText;
            productDetails.push({
                name: productName,
                price: productPrice
            });
        }

        return productDetails;
    };

    // wait for product name and price in searched page to load
    await tab.waitForSelector("div[class='_4rR01T']", { visible: true });
    await tab.waitForSelector("div[class='_30jeq3 _1_WHN1']", { visible: true });

    // evaluate takes the function to be run in console + arguments to pass to the said function
    prodDetails = await tab.evaluate(browserConsoleFunction, "div[class='_2kHMtA']", 
    "div[class='_4rR01T']",
    "div[class='_30jeq3 _1_WHN1']");

    return prodDetails;
}

async function getListingFromPaytm(browserInstance, url, input) {
    let tab  = await browserInstance.newPage();

    await tab.goto(url);

    // type input into search field
    console.log("...typing product name");
    await tab.type("input[id='searchInput']", input, { delay: 100 });

    // click on search button
    await tab.keyboard.press("Enter");

    // select all div elements
    // evaluate will be executed inside browser console
    function browserConsoleFunction(cardSelector, pNameSelector, priceSelector) {
        let searchedRows = document.querySelectorAll(cardSelector);
        let productDetails = [];
        for(let i = 0; i < 5; i++) {
            let productName = searchedRows[i].querySelector(pNameSelector).innerText;
            let productPrice = searchedRows[i].querySelector(priceSelector).innerText;
            productDetails.push({
                name: productName,
                price: productPrice
            });
        }

        return productDetails;
    };

    // wait for product name and price in searched page to load
    await tab.waitForSelector("div[class='UGUy']", { visible: true });
    await tab.waitForSelector("div[class='_1kMS']", { visible: true });
    

    // evaluate takes the function to be run in console + arguments to pass to the said function
    prodDetails = await tab.evaluate(browserConsoleFunction, "div[class='_3WhJ']", 
    "div[class='UGUy']",
    "div[class='_1kMS']");

    return prodDetails;
}

// CUSTOM ASYNC FUNCTION TO WAIT FOR SELECTOR AND CLICK ON IT
async function waitForAllSelectors(selectorPName, selectorPprice, tab ) {
    await tab.waitForSelector(selector, { visible: true });

    // not awaiting this, calling function will await for this promise's resolution
    let waitForSelectorClick = tab.click(selector, { delay: 500 });
    return waitForSelectorClick;
}

console.log("After");