let fs = require("fs");
let path = require("path");

function executeView(dirName, mode) {
    if(mode == "flat") {
        viewFlat(dirName);
        console.log("Flat View Successful!");
    } else if (mode == "tree") {
        viewTree(dirName, "");
        console.log("Tree View Successful!");
    } else {
        console.log("Wrong Command. Please use help to list all the commands.");
    };
};

function isFileChecker(dirPath) {
    return fs.lstatSync(dirPath).isFile();
};

function readContent(dirPath) {
    return fs.readdirSync(dirPath);
};

function viewFlat(dirPath) {
    // path -> file/folder
    let isFile = isFileChecker(dirPath);
    if(isFile) {
        console.log(dirPath + "*");
    } else {
        // print directory
        console.log(dirPath);

        // get children
        let children = readContent(dirPath);
        //console.log(children);
        // call for view flat
        for(let i = 0; i < children.length; i++) {
            viewFlat(path.join(dirPath,children[i]));
        }
    }
};

function viewTree(dirPath, indent) {
    let isFile = isFileChecker(dirPath);

    // to add tabs and show only current dir/file name
    // let pathSplit = dirPath.split("/");
    // let path = "";
    // for(let i = 0; i < pathSplit.length - 1; i++) {
    //     path += "    ";
    // }
    // path += pathSplit[pathSplit.length - 1];
    // or we can use path.basename

    if(isFile) {
        console.log(indent, path.basename(dirPath) + "*"); 
    } else {
        console.log(indent, path.basename(dirPath));
        let children = readContent(dirPath);
        for(let i = 0; i < children.length; i++) {
            viewTree(path.join(dirPath,children[i]), indent + "\t");
        }
    }
};

module.exports = {
    view: executeView
};