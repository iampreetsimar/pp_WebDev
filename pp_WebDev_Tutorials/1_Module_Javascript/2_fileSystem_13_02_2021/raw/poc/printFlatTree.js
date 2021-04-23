/*
    We'll use file system module from node.js
*/

let fs = require("fs");
let path = require("path");

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

viewFlat("d10");