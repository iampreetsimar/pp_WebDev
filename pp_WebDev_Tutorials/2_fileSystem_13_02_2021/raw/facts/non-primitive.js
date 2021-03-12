// function, arrays, objects
// no return type for function or data type with parameters

// FUNCTIONS
function hello(param) {
    console.log(param);
    return "this is returned";
}

hello("Hi");
let res = hello("Hola");
console.log(res);

function helloWithNoReturn(param) {
    console.log(typeof(param));
    console.log(param);
}

let resAgain = helloWithNoReturn(10);
// Will be undefined
console.log(resAgain);


/*
---------------------------------------------
*/

// OBJECT -> key: value
// empty object declaration
let obj = {};

// another object
let cap = {
    firstName: "Steve",
    lastName: "Rogers",
    address: {
        city: "Brooklyn",
        state: "New York"
    },
    isAvenger: true,
    movies: ["civil war", "age of ultron"],
    saysHi: function (param) {
        console.log("Cap says hi to", param);
    }
};

// get
console.log(cap.firstName, cap.lastName);
console.log(cap.isAvenger);
console.log(cap.address.city + ", " + cap.address.state);
console.log(cap.movies);
cap.saysHi("Simar");

// set
cap.friend = ["Tony Stark", "Wanda", "Thor", "Winter Soldier"];
console.log(cap.friend);

// delete
delete cap.address;
console.log(cap);

// for in loop
console.log("---------- For in Loop ---------------------");
for(let key in cap) {
    console.log(key, cap[key]);
} 