let fs = require("fs");

console.log("Before");

/*
    await will work on promises
    will work in async functions only
    puts another layer of abstraction on using promises based code
    await - waits for the resolution of the promise
*/
async function read() {
    try {
        let data = await fs.promises.readFile("../f1.txt");
        console.log(data + "");
        data = await fs.promises.readFile("../f2.txt");
        console.log(data + "");
        data = await fs.promises.readFile("../f3.txt");
        console.log(data + "");
    } catch(err) {
        console.log(err);
    }    
}

read();
console.log("After");
