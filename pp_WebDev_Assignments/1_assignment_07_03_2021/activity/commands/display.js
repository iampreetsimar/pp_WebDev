let path = require("path");
let { isFile, readContent } = require("../util");

function executeRead(filePaths) {
    if(filePaths.length < 1) {
        console.log("\n Incorrect Command. Please use help to list all the available commands \n\n");
        return;
    }
       
    let dataToBeRead = "";
    for(let idx in filePaths) {
        try {
            if(isFile(filePaths[idx])) {
                let readComment = "\n\n---------------Reading File: " + path.basename(filePaths[idx]) + "----------------\n\n";
                dataToBeRead += readComment;
                let data = readContent(filePaths[idx], "utf8");
                dataToBeRead += data;
            } 
        } catch (ex) {
            dataToBeRead += ex;
        }
    }

    console.log(dataToBeRead);
}

module.exports = {
    read: executeRead
};