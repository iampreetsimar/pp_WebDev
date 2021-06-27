// Destructuring means getting the values

let intro = ["Hello", "I", "Am", "Simar"];

// Normally
// let greeting = intro[0];
// let pronoun = intro[1];
// let verb = intro[2];
// let name = intro[3];

// Using destructuring
// index wise element is added from intro array to appropriate element

// CASE - consuming all values
// let [greeting, pronoun, verb, name] = intro;
// console.log(greeting + " " + pronoun + " " + verb + " " + name);


// CASE - skipping a value
let [greeting, pronoun, , name] = intro;
console.log(greeting + " " + pronoun + " " + " " + name);


// CASE - if input array itself has lesser length
// giving default value if value is undefined
let arr = ["Howdy"];
let [a = "Hi", b = "I", c = "Am", d = "Simar"] = arr;
console.log(a + " " + b + " " + c  + " " + d);


/// QUESTION - SWAP TWO VALUES WITHOUT USING A THIRD VARIABLE
let x = 10, y = 30;
[x, y] = [y, x];
console.log(x, y);
