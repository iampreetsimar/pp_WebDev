const user = {
    id: 229,
    name: "simar", 
    age: 22,
    education: {
        degree: "Masters",
        school: {
            name: "DU",
            location: "NSP"
        }
    }
}

let { name } = user;
console.log(name);

// variable inside nested object
let { education: {degree} } = user;
console.log(degree);

// variable in double nesting
let { education: { school: { location }}} = user;
console.log(location);