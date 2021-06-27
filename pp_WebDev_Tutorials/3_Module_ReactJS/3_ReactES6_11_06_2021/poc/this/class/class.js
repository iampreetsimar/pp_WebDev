// class is a prototype/blueprint
// introduced in ES6

// class abc {
//     // data members are defined in constructor
//     // on creating class object, constructor is called due to the 'new'
//     constructor(name, age) {
//         // this refers to the current object being referenced
//         this.name = name;
//         this.age = age;
//         this.hobby = "music";
//     }

//     // member functions declared outside constructor
//     // member functions also are in prototype of object
//     saysHi() {
//         console.log(this.name, "says hi");
//         console.log(this);
//     }
// }

// let o = new abc("simar", 23);
// console.log(o);
// o.saysHi();

// by default, this should be equal to window but class member functions use the 'use strict' property by default
// so this equals undefined
// let ret = o.saysHi;
// // as this is undefined, this.name will throw an error
// ret();

// adding event listener
let btn = document.querySelector("button");
// here, on a click event, saysHi fn will be called thru button, so this equals the button element
// btn.addEventListener("click", o.saysHi);

// ********************************************************
// PROBLEM : no interation b/w object and click event. 
// ********************************************************

// SOLUTION 1 : using bind
// class abc {
//     // data members are defined in constructor
//     // on creating class object, constructor is called due to the 'new'
//     constructor(name, age) {
//         // this refers to the current object being referenced
//         this.name = name;
//         this.age = age;
//         this.hobby = "music";
//         // here, this equal object
//         // also saysHi becomes a data member
//         this.saysHi = this.saysHi.bind(this);
//     }

//     // member functions declared outside constructor
//     // member functions also are in prototype of object
//     saysHi() {
//         console.log(this.name, "says hi");
//         console.log(this);
//     }
// }

// let o = new abc("simar", 23);
// // console.log(o);
// // saysHi which is called is the data member being called
// o.saysHi();

// // since we bind this to the object
// // this will be equal to the obj on each click event
// btn.addEventListener("click", o.saysHi);


// ********************************************************

// SOLUTION 2 : using arrow functions
class abc {
    // data members are defined in constructor
    // on creating class object, constructor is called due to the 'new'
    constructor(name, age) {
        // this refers to the current object being referenced
        this.name = name;
        this.age = age;
        this.hobby = "music";
    }

    // member functions declared outside constructor
    // member functions also are in prototype of object
    // using arrow function, it becomes a data member automatically
    saysHi = () => {
        console.log(this.name, "says hi");
        console.log(this);
    }
}

let o = new abc("simar", 23);
o.saysHi();

// since saysHi was declared using arrow functions, this of object was set to it
// on each click event, this refers to the object
btn.addEventListener("click", o.saysHi);


