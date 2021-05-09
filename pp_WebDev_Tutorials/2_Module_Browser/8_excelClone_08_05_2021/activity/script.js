let addSheet = document.querySelector(".fa-plus");
let sheetlist = document.querySelector(".sheet-list");
let allCells = document.querySelectorAll(".grid .col");
let cellAddress = document.querySelector(".address-box");
let alignButton = document.querySelector(".alignment-container");
let fontSizeButton = document.querySelector(".font-size");
let fontFamilyButton = document.querySelector(".font-family");
let staticLeftCol = document.querySelector(".left-col");
let staticTopRow = document.querySelector(".top-row");
let boldButton = document.querySelector(".bold");
let underlineButton = document.querySelector(".underline");
let italicButton = document.querySelector(".italic");
let colorContainer = document.querySelector(".color-container");
let currentSheetIdx = 0;
let sheetDB = workBookDB[0];

// default sheet - event listener to make it active on load
sheetlist.children[0].addEventListener("click", selectSheet);

// adds new sheet
addSheet.addEventListener("click", function() {
    let totalSheets = document.querySelectorAll(".sheet");
    let lastIdx = totalSheets.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet active-sheet");
    newSheet.setAttribute("sheetIdx", lastIdx);
    newSheet.innerText = `Sheet ${lastIdx + 1}`;
    totalSheets[currentSheetIdx].classList.remove("active-sheet");
    currentSheetIdx = lastIdx;
    newSheet.addEventListener("click", selectSheet);
    sheetlist.append(newSheet);

    // on creating new sheet, clear the UI
    initializeNewSheetDB();
    for(let i = 0; i < allCells.length; i++) {
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "0.9rem";
        allCells[i].style.fontWeight = "initial";
        allCells[i].style.fontStyle = "initial";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = "";
        allCells[i].style.color = "black";
        allCells[i].style.backgroundColor = "white";
    }

    // updating sheetDB to currentSheetIdx
    sheetDB = workBookDB[currentSheetIdx];
});

// makes selected sheet as active
function selectSheet(e) {
    let selectedSheet = e.currentTarget;

    // if selected sheed is already selected
    if(selectedSheet.classList[1])
        return;
    
    let totalSheets = document.querySelectorAll(".sheet");
    totalSheets[currentSheetIdx].classList.remove("active-sheet");
    currentSheetIdx = Number(selectedSheet.getAttribute("sheetIdx"));
    selectedSheet.classList.add("active-sheet");
}

// add event listener on cells
Array.from(allCells).forEach(function(item) {
    item.addEventListener("click", handleCell);
});

function handleCell(e) {
    if(cellAddress.value)
        unselectPreviousTopRowLeftCol();

    let rowId = Number(e.currentTarget.getAttribute("rowId")) + 1;
    let colId = Number(e.currentTarget.getAttribute("colId"));
    let curAddress = String.fromCharCode(65 + colId) + rowId;
    cellAddress.value = curAddress;
    selectCurrentTopRowLeftCol(rowId - 1, colId);

    // set current styling from SheetDB and set on UI
    let cellObject = sheetDB[rowId - 1][colId];
    // handle bold formatting
    if(cellObject.bold)
        boldButton.classList.add("active");
    else    
        boldButton.classList.remove("active");

    // handle italic formatting
    if(cellObject.italic)
        italicButton.classList.add("active");
    else    
        italicButton.classList.remove("active");

    // handle underline formatting
    if(cellObject.underline)
        underlineButton.classList.add("active");
    else    
        underlineButton.classList.remove("active");

    // handle horizontal alignment
    if(cellObject.horizontalAlignment == "left") {
        handleAlignmentActiveClass("left");
    } else if(cellObject.horizontalAlignment == "center") {
        handleAlignmentActiveClass("center");
    } else if(cellObject.horizontalAlignment == "right") {
        handleAlignmentActiveClass("right")
    } else if(cellObject.horizontalAlignment == "none") {
        handleAlignmentActiveClass("none");
    }

    // handle font-family
    fontFamilyButton.value = cellObject.fontFamily;

    // handle font-size
    fontSizeButton.value = cellObject.fontSize;

    // handle fontColor and fill color
    colorContainer.children[0].value = cellObject.fontColor;
    colorContainer.children[1].value = cellObject.bgColor;

}

// select static top row and left column
function selectCurrentTopRowLeftCol(rowId, colId) {
    staticLeftCol.children[rowId].classList.add("active");
    staticTopRow.children[colId].classList.add("active");
}

// unselects static top row and left column
function unselectPreviousTopRowLeftCol() {
    let previousSelectedCell = cellAddress.value;
    let { rowId, colId } = getRowColIdFromAddress(previousSelectedCell);
    staticLeftCol.children[rowId].classList.remove("active");
    staticTopRow.children[colId].classList.remove("active");
}

// event listener for cell alignment
alignButton.addEventListener("click", function(e) {
    if(e.target.classList.contains("align-button")) {
        let alignment = e.target.classList[2];
        let selectedCellAddress = cellAddress.value; 
        let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
        let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);
        
        // cell object from sheetDB
        let cellObject = sheetDB[rowId][colId];

        if(cellObject.horizontalAlignment == alignment) {
            curCell.style.textAlign = "left";
            cellObject.horizontalAlignment = "none";
            alignment = "none";
        } else if(alignment == "left"){
            curCell.style.textAlign = "left";
            cellObject.horizontalAlignment = "left";
        } else if (alignment == "center") {
            curCell.style.textAlign = "center";
            cellObject.horizontalAlignment = "center";
        } else if (alignment == "right") {
            curCell.style.textAlign = "right";
            cellObject.horizontalAlignment = "right";
        }
        
        handleAlignmentActiveClass(alignment);
        curCell.focus();
    }
});

function handleAlignmentActiveClass(alignment) {
    if(alignment == "left") {
        alignButton.children[1].classList.remove("active");
        alignButton.children[2].classList.remove("active");

        // setting active class on left alignment
        alignButton.children[0].classList.add("active");
    } else if(alignment == "center") {
        alignButton.children[0].classList.remove("active");
        alignButton.children[2].classList.remove("active");

        // setting active class on center alignment
        alignButton.children[1].classList.add("active");
    } else if(alignment == "right") {
        alignButton.children[0].classList.remove("active");
        alignButton.children[1].classList.remove("active");

        // setting active class on right alignment
        alignButton.children[2].classList.add("active");
    } else if(alignment == "none") {
        for(let i = 0; i < alignButton.children.length; i++) {
            alignButton.children[i].classList.remove("active");
        }
    }
}

// returns grid position of selected cell
function getRowColIdFromAddress(cellAddress) {
    let colId = cellAddress.charCodeAt(0) - 65;
    let rowId = Number(cellAddress.substring(1)) - 1; 
    return { rowId, colId };
}

// event listener for selecting font size
fontSizeButton.addEventListener("change", function() {
    let fontSize = fontSizeButton.value
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);
    curCell.style.fontSize = fontSize + "rem";
    
    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];
    cellObject.fontSize = fontSize;

    curCell.focus(); 
})

// event listener for selecting font family
fontFamilyButton.addEventListener("change", function() {
    let fontFamily = fontFamilyButton.value
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);
    curCell.style.fontFamily = fontFamily;

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];
    cellObject.fontFamily = fontFamily;

    curCell.focus(); 
})

// event listener for bold button
boldButton.addEventListener("click", function() {
    let isActive = boldButton.classList.contains("active");
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];

    if(isActive) {
        curCell.style.fontWeight = "initial";
        boldButton.classList.remove("active");
        cellObject.bold = false;
    } else {
        curCell.style.fontWeight = "bold";
        boldButton.classList.add("active");
        cellObject.bold = true;
    }

    curCell.focus();
})

// event listener for italic button
italicButton.addEventListener("click", function() {
    let isActive = italicButton.classList.contains("active");
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];

    if(isActive) {
        curCell.style.fontStyle = "initial";
        italicButton.classList.remove("active");
        cellObject.italic = false;
    } else {
        curCell.style.fontStyle = "italic";
        italicButton.classList.add("active");
        cellObject.italic = true;
    }

    curCell.focus();
})

// event listener for underline button
underlineButton.addEventListener("click", function() {
    let isActive = underlineButton.classList.contains("active");
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];

    if(isActive) {
        curCell.style.textDecoration = "initial";
        underlineButton.classList.remove("active");
        cellObject.underline = false;
    } else {
        curCell.style.textDecoration = "underline";
        underlineButton.classList.add("active");
        cellObject.underline = true;
    }

    curCell.focus();
})

// event listener for color container
colorContainer.addEventListener("change", function(e) {
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];

    if(e.target == colorContainer.children[0]) {
        curCell.style.color = colorContainer.children[0].value;
        cellObject.fontColor = colorContainer.children[0].value;
    } else if(e.target == colorContainer.children[1]) {
        curCell.style.backgroundColor = colorContainer.children[0].value;
        cellObject.bgColor = colorContainer.children[0].value;
    }
})

allCells[0].click();
allCells[0].focus();



