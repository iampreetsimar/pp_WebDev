const o = {
    who: "World",
    greet() {
        return `Hello, ${this.who}!`;
    },
    farewell : () => {
        return `Goodbye, ${this.who}!`;
    }
}

console.log(o.greet()); // Hello, World!
console.log(o.farewell());  // Goodbye, undefined!

// greet is being called through object 'o', so this equals o
// farewell is an arrow function so this should be equal to this of lexical parent which is o, but since o does not have a this object
// it will check from its lexcial parent which is global. so, this equals window which mean this.who is undefined