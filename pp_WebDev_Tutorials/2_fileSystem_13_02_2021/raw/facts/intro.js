console.log("Hello PP :)");

// variable declaration
// default value - undefined
let a;

//prints undefined
console.log("a is", a);

// BASIC DATA TYPES -> undefined, number, string, boolean, null
// js is dynamically typed language

a = 10;
console.log("a is", a);

a = 10.2;
console.log("a is", a);

a = "a string";
console.log("a is", a);

a = 'a string';
console.log("a is", a);

a = true;
console.log("a is", a);

a = null;
console.log("a is", a);


// JS SYNTAX - similar to JAVA

// Functions and Loops
// Check if a number is prime
function isPrime(num) {
    for(let i = 2; i * i <= num; i++) {
        if(num % i == 0) {
            return false;
        }
    }
    
    return true;
}

let num = 23;
if(isPrime(num)) {
    console.log("Number", num, "is Prime");
} else {
    console.log("Number", num, "is not Prime");
}

