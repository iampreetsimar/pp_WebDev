let words = ["spray", "limit", "elite", "disruption", "nervousness"];

// Basic way of using filter
// let filteredWords = [];
// for(let i = 0; i < words.length; i++) {
//     if(words[i].length > 6) {
//         filteredWords.push(words[i]);
//     }
// }

// Using filter method
// Filter function's callback function returns true to include that element in the filtered result, else false
let filteredWords = words.filter(function (el) {
    return el.length > 6;
})


console.log(words);
console.log(filteredWords);