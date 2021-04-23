let fs = require("fs");
let arr = ["../f1.txt", "../f2.txt", "../f3.txt"];

console.log("Before");

async function read() {
    let data;
    for(let i = 0; i < arr.length; i++) {
        data = await fs.promises.readFile(arr[i]);
        console.log("Content: " + data);
    }
}

read();

console.log("After");
