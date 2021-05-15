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
let formulaInput = document.querySelector(".formula-box");
let gridContainer = document.querySelector(".grid-container");
let topLeftBlock = document.querySelector(".top-left-block");
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
    initializeNewSheetUI();

    // updating sheetDB to currentSheetIdx
    sheetDB = workBookDB[currentSheetIdx];
    allCells[0].click();
    allCells[0].focus();
});

// initialize UI for new sheet
function initializeNewSheetUI() {
    Array.from(allCells).forEach(function(cell) {
        cell.style.fontSize = "0.9rem";
        cell.style.fontFamily = "Arial";
        cell.style.fontStyle = "normal";
        cell.style.fontWeight = "normal";
        cell.style.textDecoration = "none";
        cell.style.textAlign = "left";
        cell.innerText = "";
        cell.style.color = "#000000";
        cell.style.backgroundColor = "#FFFFFF";
    })
}

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

    // update sheetDB and first cell should be selected on switch
    sheetDB = workBookDB[currentSheetIdx];
    setUIFromSheetDB(sheetDB);
    allCells[0].click();
    allCells[0].focus();
}

function setUIFromSheetDB(sheetDB) {
    for(let i = 0; i < sheetDB.length; i++) {
        for(let j = 0; j < sheetDB[i].length; j++) {
            let curCell = document.querySelector(`.col[rowId="${i}"][colId="${j}"]`);
            let { fontFamily, 
                fontSize, 
                bold, 
                italic, 
                underline, 
                horizontalAlignment, 
                fontColor, 
                bgColor, 
                value } = sheetDB[i][j];

            curCell.style.fontFamily = fontFamily;
            curCell.style.fontSize = fontSize + "rem";
            curCell.style.fontWeight = bold ? "bold" : "normal";
            curCell.style.fontStyle = italic ? "italic" : "normal";
            curCell.style.textDecoration = underline ? "underline" : "none";
            curCell.style.textAlign = (horizontalAlignment == "none") ? "left" : horizontalAlignment;
            curCell.innerText = value;
            curCell.style.color = fontColor;
            curCell.style.backgroundColor = bgColor;
        }
    }
}

// add event listener on cells
Array.from(allCells).forEach(function(item) {
    item.addEventListener("click", handleCell);

    // event listener to keep track of cell height
    item.addEventListener("keyup", function() {
        let cellBoundaryObject = item.getBoundingClientRect();
        let curCellHeight = cellBoundaryObject.height;
        let selectedCellAddress = cellAddress.value; 
        let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
        let leftStaticCol = document.querySelectorAll(".left-col .left-col-box")[rowId];
        leftStaticCol.style.height = curCellHeight + "px";
    })
});

// updates address bar on cell selection
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

    // handle cell content - no need
    // already handled in setUIFromSheetDB()
    // let curCell = document.querySelector(`.col[rowId="${rowId - 1}"][colId="${colId}"]`);
    // curCell.innerText = cellObject.value;

    // handle formula bar
    formulaInput.value = cellObject.formula;
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

// handles selection of alignment button
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
        curCell.style.fontWeight = "normal";
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
        curCell.style.fontStyle = "normal";
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
        curCell.style.textDecoration = "none";
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
        curCell.style.backgroundColor = colorContainer.children[1].value;
        cellObject.bgColor = colorContainer.children[1].value;
    }

    curCell.focus();
})

// event listener for cell content
Array.from(allCells).forEach(function(cell) {
    cell.addEventListener("blur", handleCellContent);
    cell.addEventListener("keyup", handleTabs);
});

// on keyup of tab on cell, click on the active cell
// this handles all the cases for cell content
function handleTabs(e) {
    if(e.key == "Tab") {
        e.currentTarget.click();
    }
}

// updates sheetDB value property from cell content
function handleCellContent() {
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

    // cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];

    if(cellObject.value == curCell.innerText)
        return;

    if(cellObject.formula) {
        // if cell has a corresponding formula
        // and we've overwritten the cell content
        removeFormulaFromParentAndItself(cellObject, selectedCellAddress);
    }

    cellObject.value = curCell.innerText;

    // update children of cellObject
    updateChildren(cellObject);
}

// **************** IMPELEMENATATION FOR FORMULA BAR ********************

// event listener on formula bar
formulaInput.addEventListener("keydown", function(e) {
    // if formula is not empty and enter is pressed
    if(e.key == "Enter" && formulaInput.value) {
        let formula = formulaInput.value;

        // get current cell from address bar
        let selectedCellAddress = cellAddress.value; 
        let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);

        // if formula is already present in sheetDB
        // and is not equal to the current formula
        // remove formula from parent and itself first
        let cellObject = sheetDB[rowId][colId];
        let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);

        if(cellObject.formula == formula) {
            curCell.focus();
            return;
        }

        // to detect cycle dependency using graph, if exists in formula -> show an alert
        // NEED TO IMPLEMENT THIS!!!!!
        // if(isCyclePresent())
        //     return;

        if(cellObject.formula && cellObject.formula != formula) {
            removeFormulaFromParentAndItself(cellObject, selectedCellAddress);
        } 

        // evaluate formula
        let evaluatedValue = evaluateFormula(formula);

        // set UI for the change
        curCell.innerText = evaluatedValue;
        
        // update DB -> set content in DB (val, formula)
        setCellContentInDB(evaluatedValue, formula, rowId, colId, selectedCellAddress, false);
        updateChildren(cellObject);
        curCell.focus();
    }
})

// updates UI for the cell
function setCellContentInUI(rowId, colId, evaluatedValue) {
    document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`).innerText = evaluatedValue;
}

// evaluates the formula and returns evaluated value
function evaluateFormula(formula) {
    // eg: ( 2 * A1 )
    // split - [(, 2, *, A1, )]
    // DB -> get value of A1
    // replace - [(, 2, *, 10, )]
    // (2 * 10)
    // get result from it
    // return 20 (use of eval function or we can use infix evaluation)
    // usage of eval function is not good as any script can be run through it

    let tokens = formula.split(" ");
    tokens.forEach(function(token) {
        let char = token.charCodeAt(0);
        if(char >= 65 && char <= 90) {
            let { rowId, colId } = getRowColIdFromAddress(token);
            let cellObject = sheetDB[rowId][colId];
            let { value } = cellObject;
            formula = formula.replace(token, value);
        }
    });

    // need to use infix evaluation
    let evaledRes = eval(formula);
    return evaledRes;
}

// updates cell details in DB along with the children
function setCellContentInDB(value, formula, rowId, colId, curCellAddress, fromUpdateChildren) {
    // updated value in cell object from sheetDB
    let cellObject = sheetDB[rowId][colId];
    cellObject.value = value;
    cellObject.formula = formula;

    // flag to check if from update children -> return from this point
    if(fromUpdateChildren)
        return;

    // update parent's children
    let tokens = formula.split(" ");
    tokens.forEach(function(token) {
        let char = token.charCodeAt(0);
        if(char >= 65 && char <= 90) {
            let parentIds = getRowColIdFromAddress(token);
            let parentObject = sheetDB[parentIds.rowId][parentIds.colId];
            parentObject.children.push(curCellAddress);
        }
    });
}

// updates cell content in UI and DB for children recursively
function updateChildren(cellObject) {
    cellObject.children.forEach(function(child) { 
        let childIdx = getRowColIdFromAddress(child);
        let childObj = sheetDB[childIdx.rowId][childIdx.colId];
        let updatedEvaledVal = evaluateFormula(childObj.formula);
        setCellContentInUI(childIdx.rowId, childIdx.colId, updatedEvaledVal);
        setCellContentInDB(updatedEvaledVal, childObj.formula, childIdx.rowId, childIdx.colId, child, true);
        updateChildren(childObj);
    })
}

function removeFormulaFromParentAndItself(cellObject, childAddress) {
    let formula = cellObject.formula;

    // update parent's children and remove child
    let tokens = formula.split(" ");
    tokens.forEach(function(token) {
        let char = token.charCodeAt(0);
        if(char >= 65 && char <= 90) {
            let parentIds = getRowColIdFromAddress(token);
            let parentObject = sheetDB[parentIds.rowId][parentIds.colId];
            let chidIdx = parentObject.children.indexOf(childAddress);
            parentObject.children.splice(chidIdx, 1);
        }
    });

    // remove formula from child itself
    cellObject.formula = "";
}


// **************** IMPELEMENATATION FOR TOP STATIC ROW AND LEFT STATIC COL SCROLL ********************

// event listener to change top and left position of static row and col on grid scroll
gridContainer.addEventListener("scroll", function() {
    let gridTop = gridContainer.scrollTop;
    let gridLeft = gridContainer.scrollLeft;

    topLeftBlock.style.top = gridTop + "px";
    topRow.style.top = gridTop + "px";

    leftCol.style.left = gridLeft + "px";
    topLeftBlock.style.left = gridLeft + "px";
})

allCells[0].click();
allCells[0].focus();