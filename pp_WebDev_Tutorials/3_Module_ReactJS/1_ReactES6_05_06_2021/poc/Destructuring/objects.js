let person = {
    name: "Steve",
    city: "Brooklyn",
    job: "Avenger"
}

// let name = person.name;
// let city = person["city"];
// let job = person.job;
// console.log(name, city, job);

// Using Destructuring
// let { name, city, job } = person;
// console.log(name, city, job);

// if key is not present in object
// let { friend } = person
// console.log(friend);

// for default value
let { name = "Peter", city = "NYC", job = "Student", friend = "Tony" } = person;
console.log(name, city, job, friend);


// ALIAS - to have differen names for destructured variables 
// let { name: a, city: b, job: c } = person;
// console.log(a, b, c);