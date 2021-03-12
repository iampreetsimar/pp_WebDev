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

viewTree("d10", "");