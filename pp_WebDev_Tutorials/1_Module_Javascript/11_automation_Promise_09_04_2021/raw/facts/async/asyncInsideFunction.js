let fs = require("fs");

`
OUTPUT:

Before
Before Read File
After Read File
Before Read File
After Read File
Before Read File
After Read File
After
Content: I am f2
Content: I am f1.txt
Content: I am f3

-------------------------------------

    Works exactly same as if the async function are called directly

    Serial Task - Next Task are dependent on the previos task
                    Eg: Zoom Download -> Compress File -> Cut it into pieces -> Upload
    Paraller Task - Task can work in parallel
                    Eg: Download 5 files

    SYNC FUNCTIONS DO SERIAL TASKS
    ASYNC FUNCTIONS DO SERIAL AS WELL AS PARALLEL TASKS

    SYNC FUNCTIONS - one added to the main stack are only removed once the work is done
    ASYNC FUNCTIONS - added to the stack and removed from it and passed to node API to get the work done
                      Meanwhile, the worl is getting done by node API, the control in the main program moves forward and does the work on main stack

`

console.log("Before");

function fileReader(fileName) {
    console.log("Before Read File");
    fs.readFile(fileName, cb);
    console.log("After Read File");
}

function cb(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log("Content: " + data);
    }
}

fileReader("f1.txt");
fileReader("f2.txt");
fileReader("f3.txt");

console.log("After");