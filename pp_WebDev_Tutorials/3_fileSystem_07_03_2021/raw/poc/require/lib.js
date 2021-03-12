function fn() {
    console.log("I was called from lib");
};

let a = 20;
let private = 40;

// to set what's visible when we use lib.js
module.exports = {
    fxn: fn,
    varName: a
};