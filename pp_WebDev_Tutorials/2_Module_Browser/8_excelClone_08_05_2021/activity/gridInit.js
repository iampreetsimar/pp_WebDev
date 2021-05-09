let topRow = document.querySelector(".top-row");
let str = "";
for(let i = 0; i < 26; i++) {
    str += `<div class="col">${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML += str;

let leftCol = document.querySelector(".left-col");
str = "";
for(let i = 0; i < 100; i++) {
    str += `<div class="left-col-box">${i + 1}</div>`;
}

leftCol.innerHTML = str;


// 2D grid
let grid = document.querySelector(".grid");
str = "";
for(let i = 0; i < 100; i++) {
    str += `<div class="row">`;
    for(let j = 0; j < 26; j++) {
        str += `<div class="col" rowId=${i} colId=${j} contenteditable="true"></div>`;
    }
    str += `</div>`;
}

grid.innerHTML = str;



// ************************************
// DB to store sheet formatting details in a 2D array
// To keep track of formatting details

let sheetDB = [];
for(let i = 0; i < 100; i++) {
    let row = [];
    for(let j = 0; j < 26; j++) {
        let cell = {
            bold: false,
            italic: false,
            underline: false,
            fontFamily: "Arial",
            fontSize: "0.9",
            horizontalAlignment: "none",
        }
        row.push(cell);
    }
    sheetDB.push(row);
}