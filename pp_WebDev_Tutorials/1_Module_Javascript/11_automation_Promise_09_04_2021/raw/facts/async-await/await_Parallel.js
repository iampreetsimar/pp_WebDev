let fs = require("fs");
let arr = ["../f1.txt", "../f2.txt", "../f3.txt"];

console.log("Before");

(async function read() {
    let promiseArr = [];
    let data;
    for(let i = 0; i < arr.length; i++) {
        promiseArr.push(fs.promises.readFile(arr[i]));
    }

    let allFilesPromise = await Promise.all(promiseArr);
    for(let i = 0; i < allFilesPromise.length; i++) {
        console.log("Content: " + allFilesPromise[i]);
    }
})();

console.log("After");