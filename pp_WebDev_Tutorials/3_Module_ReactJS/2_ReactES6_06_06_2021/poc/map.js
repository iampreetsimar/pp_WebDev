/*
    Higher Order Function(HOF)
        Any function which takes another function as an argument or returns another function
*/

let arr = [1, 2, 3, 4, 5];

// Basic way of Map
// let sqArr = [];
// for(let i = 0; i < arr.length; i++) {
//     sqArr[i] = (arr[i] * 2);
// }

// Using Map function
// el corresponds to the elements in arr at a time
let sqArr = arr.map(function (el) {
    return 2 * el;
})

let thriceFn = function (el) {
    return 3 * el;
}

// Using Map function by passing a function a param
let thriceArr = arr.map(thriceFn);

console.log(arr);
console.log(sqArr);
console.log(thriceArr);