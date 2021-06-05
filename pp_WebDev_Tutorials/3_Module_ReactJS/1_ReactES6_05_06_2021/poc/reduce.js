let arr = [1, 2, 3, 4, 5];

// Basic way of using reduce
let sum = 0;
for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
}

// Using reduce method - reduces the input array to a single result
// Whereas map and filter return a new array
// Reduce callback fn has two params - accumulator, currentVal
// acc's starting value is element at starting idx
// cVal's starting value is element at 2nd idx
// now the returned value from callback gets stored in acc and cVal value is changes by going to next idx
let reduceFnSUm = arr.reduce(function (acc, cVal) {
    return acc + cVal
})


console.log(sum);
console.log(reduceFnSUm);