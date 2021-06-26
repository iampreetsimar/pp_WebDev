let person = {
    name: "Simar",
    age: 27,
    country: "India"
}

// Since ref to copy is same as ref to person
// country in person will also change
// let copy = person;
// copy.country = "Spain";

// Using spread operator
let copy = {...person};
copy.country = "Spain";
console.log(person);
console.log(copy);