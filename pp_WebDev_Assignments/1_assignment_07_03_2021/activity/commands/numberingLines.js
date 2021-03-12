let {   isFile, 
        readContent, 
        displayFile,
        numberAllLines,
        numberNonEmptyLines } = require("../util");
let { getSingleLineBreak } = require("./singleLineBreak");

function executeNumberLines(input, command) {
    if(input.length == 0 || input.length > 3) {
        console.log("\n Incorrect Command. Please use help to list all the available commands \n\n");
        return;
    }

    let content;
    if(input.length == 1) {
        content = numberLines(input[0], command);
    } else if(input.length == 2) {
        if(input[0] == "-s" && command == "-n") {
            content = numberAllLines(getSingleLineBreak(input[1]));
        } else if(input[0] == "-s" && command == "-b"){
            content = numberNonEmptyLines(getSingleLineBreak(input[1]));
        } else {
            content = numberLines(input[1], command);
        }
    } else if(input.length == 3)  {
        if(input[0] == "-s" || input[1] == "-s" && command == "-n")
            content = numberAllLines(getSingleLineBreak(input[2]));
        else if(input[0] == "-s" || input[1] == "-s" && command == "-b")
            content = numberNonEmptyLines(getSingleLineBreak(input[2]));
    } 

    displayFile(content, input[input.length - 1]);
};

function numberLines(filePath, command) {
    if(isFile(filePath)) {
        if(command == "-n")
            return numberAllLines(readContent(filePath, "utf8"));
        else    
            return numberNonEmptyLines(readContent(filePath, "utf8"));
    }   
};

module.exports = {
    numberLines: executeNumberLines
}