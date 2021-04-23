// ARRAY -> collection of elements of any type

// Empty Array
let arr = [];

// mixed elements
let arrMixed = [
    12, 
    "hello", 
    null, 
    true, 
    [1,2,3,4,5], 
    function saysHi() {
        console.log("Hi");
    },
    {
        name: "Simar",
        lastName: "Preet"
    }
];

console.log(arr);
console.log(arrMixed);

// ACCESS
console.log(arrMixed[6].name);

// need to call the function
arrMixed[5]();

// ITERATE
console.log("-----------ITERATION-------------")
for(let i = 0; i < arrMixed.length; i++) {
    console.log(i, ":", arrMixed[i]);
}

// UPDATE
// arrMixed[2] = 23;

// For in Loop
// key is index
for(let key in arrMixed) {
    console.log("Key", key, ":", arrMixed[key]); 
}

// imitates an array
// some empty items will be present while printing
arrMixed[10] = "10";
console.log(arrMixed);
console.log(arrMixed.length);  // returns 11

// We can add the element like an object with key:value pair
// it will be added to the array
// length will not be incremented as we are adding invalid key
arrMixed["nextEmptyIndex"] = "atEmptyIndex";
console.log(arrMixed);
console.log(arrMixed.length);  // return 11

// **************  IMPORTANT  ****************
// arr.length gives the last index element of the elements present in the array
// even if there invalid objects or empty elements
// arrays are emulated with the help of object - ADAPTER DESIGN PATTERN


// *******************************************
const newArray = [1, 2, 3, 4, 5];
console.log(newArray);

// UNSHIFT()
// unshift to add element to the beginning
// since const is used, we can't change the array first element
// newArray has address of newArray[0] in the beginning
newArray.unshift(10);
console.log(newArray);

// to delete element from the beginning
// SHIFT()
newArray.shift();
console.log(newArray);

// add at the end
// PUSH()
newArray.push(22);
console.log(newArray);

// remove from the end
// POP()
newArray.pop();
console.log(newArray);

// SLICE(startingIndex, endIndex)
// returns a new sliced array 
// end index is exclusive
let slicedArr = newArray.slice(1, 4);
console.log(newArray);
console.log(slicedArr);

// SPLICE(startingIndex, noToBeDeleted)
// returns deleted elements
// changes original array by removing deleted elements
let splicedArr = newArray.splice(2, 4);
console.log(splicedArr);
console.log(newArray);

// SPLIT()
let string = "This is a string to be searched";
let strArr = string.split(" ");
console.log(strArr);

// JOIN()
let joinedStr = strArr.join(" ");
console.log(joinedStr);



