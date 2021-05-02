let addSheet = document.querySelector(".fa-plus");
let sheetlist = document.querySelector(".sheet-list");
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
    let totalSheets = document.querySelectorAll(".sheet");
    totalSheets[currentSheetIdx].classList.remove("active-sheet");
    currentSheetIdx = Number(selectedSheet.getAttribute("sheetIdx"));
    selectedSheet.classList.add("active-sheet");
}

