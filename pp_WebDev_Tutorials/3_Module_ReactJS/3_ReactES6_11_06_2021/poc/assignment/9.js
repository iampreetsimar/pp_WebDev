/*
    How to call logMessage in order to log Hello, World?
    
    const ob = {
        message: "Hello, World!" 
    }

    function logMessage() {
        console.log(this.message);
    }
*/

const ob = {
    message: "Hello, World!" 
}

function logMessage() {
    console.log(this.message);
}

// this as ob is bind to the fn function(returned by bind method on logMessage)
let fn = logMessage.bind(ob);
fn();