// var person = "simar"

// in functions, value of this is dependent upon how a function is called
// it is dynamically bound at runtime. Whatever the value of this is at runtime
function fn() {
    console.log(this);
    console.log(`Hi my name is ${this.person}`);
}

// here, this is window object if function is called in default way
fn();

// person is attached to global object now


// *********************************************************************

let obj = {
    person: "thru function",
    func: fn
}

// when function is called through an object, this is equal to the object through which function is called
obj.func();


// this is equal to the window object
let f1 = obj.func;
f1();

// this will be equal to the window object
setTimeout(obj.func, 1000);

function strictfn() {
    // using 'use strict' inside a function and calling this function NORMALLY will set this as undefined
    // 'use strict' does not work in case of api functions like setTimeout
    'use strict'
    console.log(this);
    console.log(this.person);
}

strictfn();