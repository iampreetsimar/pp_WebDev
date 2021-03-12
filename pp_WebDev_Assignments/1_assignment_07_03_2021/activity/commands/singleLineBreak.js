let { isFile, readContent, displayFile, numberAllLines, numberNonEmptyLines } = require("../util");

function executeSingleLB(input) {
    if(input.length == 0 || input.length > 3) {
        console.log("\n Incorrect Command. Please use help to list all the available commands \n\n");
        return;
    }

    let content = getSingleLB(input[input.length - 1]);

    if(input.length == 2) {
        if(input[0] == "-n")
            content = numberAllLines(content, input[0]);
        else if(input[0] == "-b")
            content = numberNonEmptyLines(content, input[0]);
    } else if(input.length == 3)  {
        if(input[0] == "-n" && input[1] == "-b")
            content = numberAllLines(content, input[0]);
        else if(input[0] == "-b" && input[1] == "-n")
            content = numberNonEmptyLines(content, input[0]);
    } 

    displayFile(content, input[input.length - 1]);
}

function getSingleLB(filePath) {
    if(isFile(filePath))
        return removeMultipleLineBreaks(readContent(filePath));
}

function removeMultipleLineBreaks(data) {
    return data.replace(/^\s*[\r\n]/gm, "");
}

module.exports = {
    singleLineBreak: executeSingleLB,
    getSingleLineBreak: getSingleLB,
    removeMultipleLineBreaks: removeMultipleLineBreaks
};