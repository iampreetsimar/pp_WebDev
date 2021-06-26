let state = {
    name: "simar",
    address: {
        city: "London",
        country: {
            countryName: "United Kingdom",
            countryCode: "UK"
        }
    }
}

// ref to copy is diff but ref to address and country are still same
// spread operator does does shallow copy
// let copy = {...state};
// copy.address.city = "Delhi";

// using spread operator to change ref for nested object

// has deep copy for address
// let copy = {...state, address: {...state.address}};

// deep copy for country as well
// Very useful in react
let copy = {...state,
    address: {...state.address, 
    country: {...state.address.country}
    }
}

// let copy = JSON.parse(JSON.stringify(state))

copy.address.city = "Wales";
copy.address.country.countryName = "Britain";
console.log(state);
console.log(copy);