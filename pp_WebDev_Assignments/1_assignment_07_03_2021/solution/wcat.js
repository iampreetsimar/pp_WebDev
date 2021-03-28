let fs = require("fs");

let input = process.argv.slice(2);

let options = [];
let filepaths = [];

for(let i = 0; i < input.length; i++) {
    if(input[i].charAt(0) === "-") {
        options.push(input[i]);
    } else {
        filepaths.push(input[i]);
    }
}

// edge case - if path does not exist
for(let i = 0; i < filepaths.length; i++) {
    if(!fs.existsSync(filepaths[i])) {
        console.log(filepaths[i], "does not exist");
        return;
    }
}

let allFilesContent = "";
for(let i = 0; i < filepaths.length; i++) {
    allFilesContent += "\n***************** " + filepaths[i] + " *****************\n";
    allFilesContent += fs.readFileSync(filepaths[i]);
}

let allFilesContentArr = allFilesContent.split("\n");   // if windows - need to do split on \r\n

let isSPresent = includes(options, "-s");

if(isSPresent) {
    for(let i = 1; i < allFilesContentArr.length; i++) {
        if(allFilesContentArr[i - 1] === "" && allFilesContentArr[i] === "") {
            allFilesContentArr[i] = null;
        } else if(allFilesContentArr[i] === "" && allFilesContentArr[i - 1] === null) {
            allFilesContentArr[i] = null;
        } 
    }

    let resArr = []
    for(let i = 0; i < allFilesContentArr.length; i++) {
        if(allFilesContentArr[i] !== null) {
            resArr.push(allFilesContentArr[i]);
        }
    }
    allFilesContentArr = resArr;
}

let finalOption = "";

if(options.indexOf("-b") !== -1) {
    if(options.indexOf("-n") !== -1) {
        if(options.indexOf("-b") < options.indexOf("-n")) {
            finalOption = "-b";
        } else {
            finalOption = "-n";
        }
    } else {
        finalOption = "-b";
    }
}

if(options.indexOf("-n") !== -1) {
    if(options.indexOf("-b") !== -1) {
        if(options.indexOf("-n") < options.indexOf("-b")) {
            finalOption = "-n";
        } else {
            finalOption = "-b";
        }
    } else {
        finalOption = "-n";
    }
}

if(finalOption !== "") {
    if(finalOption === "-b") {
        addNumberingToContent(allFilesContentArr);
    } else {
        addNumberingToEverything(allFilesContentArr);
    }
}


function includes(arr, element) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === element)
            return true;
    }
    return false;
}


function addNumberingToContent(arr) {
    let count = 1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== "") {
            arr[i] = count + "     " + arr[i];
            count++;
        }
    }
}

function addNumberingToEverything(arr) {
     for(let i = 0; i < arr.length; i++) {
         arr[i] = i + 1 + "     " + arr[i];
     }
}

console.log(allFilesContentArr.join("\n"));