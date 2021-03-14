let fs = require("fs");

console.log("Before");

`
    There are no interrupts in JS.
    There's a waiting queue consisting of callbacks/promises/etc. 
    Callbacks can't be directly executed on the stack.

    The EVENT LOOP checks the waiting queue and adds the event 
    in the queue to the execution stack to be executed when JS stack is empty

    Developers don't have access to the EVENT LOOP.

    Every time async functions are called:
        - it is added to call main stack ony by one
        - removed from main stack and passed to node API which runs the 
          methods in parallel/asynchronously and do the work
        - when the work for a particular function is complete, its 
          callback function is added to the queue
        - the event loop removed the callback function from queue and adds it to control execution stack
          , where it is executed

`

fs.readFile("f1.txt", cb);
fs.readFile("f2.txt", cb);
fs.readFile("f3.txt", cb);
fs.readFile("f4.txt", cb);
function cb(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log("Content: " + data);
    }
}

console.log("After");