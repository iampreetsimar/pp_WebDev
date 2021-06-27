// SPREAD OPERATOR (...)
// 1. used to expand iterative elements

// let arr = [1,2,3,4,5];
// console.log(...arr);

// 2. to copy
let arr = [0, 1, 2, 3, 4, 5, 6];
let idx = 3;

// to insert element 10 at idx 3
// but make this change immutably, i.e., 
// a new array will be created with element 10 at idx 3
// Immutably - this change should not be reflected in original array

// BASIC WAY
// let res = [];
// for(let i = 0; i < idx; i++) {
//     res[i] = arr[i];
// }
// res[idx] = 10;
// for(let i = idx; i < arr.length; i++) {
//     res.push(arr[i]);
// }

// console.log(arr);
// console.log(res);

/*
    let res = arr
    res[0] = 1000
    this will change arr[0] to 1000 as well
    since res and arr point to same reference
    changing res[0] changes the element at idx: 0 at the reference
*/

// Using SPREAD OPERATOR
// this creates a new copy of arr
// reference of res and arr are different now
// let res = [...arr];
// res[3] = 10;
// console.log(arr);
// console.log(res);

// Using SPREAD to insert 10 at idx 3
let res = [...arr.slice(0, idx), 10, ...arr.slice(idx)];
console.log(arr);
console.log(res);