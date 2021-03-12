let fs = require("fs");
let path = require("path");

function isFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch {
        throw "\n\nFile: " + path.basename(filePath) + " does not exist!!\n\n";
    }
};

function readContent(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
    }
    catch {
        throw "\n\nCannot read File: " + path.basename(filePath) + "\n\n";
    }
};

function displayFile(content, filePath) {
    console.log("\n\n--------- Reading File: ", path.basename(filePath), "--------------\n\n");
    console.log(content, "\n\n");
};

function numberAllLinesInContent(content) {
    content = content.split("\n");
    let data = "";
    for(let i = 0; i < content.length; i++) {
        data += i + 1 + "\t" + content[i] + "\n";
    }
    return data;
};

function isStringEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

function numberNonEmptyLinesInContent(content) {
    content = content.split("\n");
    let data = "";
    let counter = 1;
    for(let i = 0; i < content.length; i++) {
        if(!isStringEmpty(content[i])) {
            data += counter + "\t" + content[i] + "\n";
            counter++;
        } else {
            data += "\t" + content[i] + "\n";
        }
    }
    return data;
}

module.exports = {
    isFile: isFile,
    readContent: readContent,
    displayFile: displayFile,
    numberAllLines: numberAllLinesInContent,
    numberNonEmptyLines: numberNonEmptyLinesInContent
}
