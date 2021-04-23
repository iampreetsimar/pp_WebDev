// to import just a fxn from lib.js
// const { fxn } = require("./lib");
// fxn();

// import everything from lib.js into an object
let libFileObj = require("./lib");
console.log(libFileObj.varName);
libFileObj.fxn();