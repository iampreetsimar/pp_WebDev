// function fn() {
//     console.log(this);
//     console.log(this.person);

//     function abc() {
//         console.log(this);
//         console.log(this.person);
//     }

//     abc();
// }

// let obj = {
//     person : "simar",
//     func: fn
// }

// // here fn is called through obj so, this refers to the object and person is also defined
// // but abc is called normally so, here, this refers to the window object and person is not defined
// obj.func();

// *****************************************************************
// ••••••• PROBLEM : abc fn call should also have the same this through object
// *****************************************************************

// SOLUTION 1 : USING BIND FUNCTION - 
// bind method returns another function whose this is set equal to the argument passed to bind
// function fn() {
//     console.log(this);
//     console.log(this.person);

//     function abc() {
//         console.log(this);
//         console.log(this.person);
//     }

//     let ret = abc.bind(this);
//     // here, this which equals object is bind to the method returned by bind method with abc function
//     // calling ret() we can see abc fn is called but this equals obj for it
//     // bind does not affect the original method, abc here.
//     ret();
// }

// let obj = {
//     person : "simar",
//     func: fn
// }

// obj.func();

// *****************************************************************

// SOLUTION 2 : USING ARROW FUNCTIONS - 
// SYNTAX : let fon = () => { }
// this of arrow functions is equal to the this of their immediate parent fn/lexically superior this
function fn() {
    console.log(this);
    console.log(this.person);

    let abc = () => {
        console.log(this);
        console.log(this.person);
    }

    abc();
}

let obj = {
    person : "simar",
    func: fn
}

obj.func();