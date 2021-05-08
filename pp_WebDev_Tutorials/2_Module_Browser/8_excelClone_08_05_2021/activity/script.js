let addSheet = document.querySelector(".fa-plus");
let sheetlist = document.querySelector(".sheet-list");
let allCells = document.querySelectorAll(".grid .col");
let cellAddress = document.querySelector(".address-box");
let alignButton = document.querySelector(".alignment-container");
let fontSizeButton = document.querySelector(".font-size");
let currentSheetIdx = 0;

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
    let rowId = Number(e.currentTarget.getAttribute("rowId")) + 1;
    let colId = Number(e.currentTarget.getAttribute("colId"));
    let curAddress = String.fromCharCode(65 + colId) + rowId;
    cellAddress.value = curAddress;
}

// event listener for cell alignment
alignButton.addEventListener("click", function(e) {
    if(e.target.classList.contains("align-button")) {
        let alignment = e.target.classList[0];
        let selectedCellAddress = cellAddress.value; 
        let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
        let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);
        
        if(alignment == "left")
            curCell.style.textAlign = "left";
        else if (alignment == "center")
            curCell.style.textAlign = "center";
        else if (alignment == "right")
            curCell.style.textAlign = "right";
    
        curCell.focus();
    }
});

// returns grid position of selected cell
function getRowColIdFromAddress(cellAddress) {
    let colId = cellAddress.charCodeAt(0) - 65;
    let rowId = Number(cellAddress.substring(1)) - 1; 
    return { rowId, colId };
}

fontSizeButton.addEventListener("change", function() {
    let fontSize = fontSizeButton.value
    let selectedCellAddress = cellAddress.value; 
    let { rowId, colId } = getRowColIdFromAddress(selectedCellAddress);
    let curCell = document.querySelector(`.col[rowId="${rowId}"][colId="${colId}"]`);
    curCell.style.fontSize = fontSize + "rem";
    curCell.focus(); 
})

allCells[0].click();
allCells[0].focus();



