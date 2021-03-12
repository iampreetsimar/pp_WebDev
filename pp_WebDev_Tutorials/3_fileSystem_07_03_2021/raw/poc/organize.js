let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// mkdir, mkdirSync - to create directories
// existsSync - to check if file/folder exists at the given path
function createDirectory(path) {
    if(!fs.existsSync(path))
        fs.mkdirSync(path);
}

// organized_files directory
let input = process.argv.slice(2);
let dirPath = input[0];
let orgFilePath = path.join(dirPath, "organized_files");
createDirectory(orgFilePath);

// types subdirectory
for(let key in types) {
    let innerDirPath = path.join(orgFilePath, key);
    createDirectory(innerDirPath);
}

// others subdirectory
let otherDirPath = path.join(orgFilePath, "others");
createDirectory(otherDirPath);

function isFileChecker(dirPath) {
    return fs.lstatSync(dirPath).isFile();
};

function readContent(dirPath) {
    return fs.readdirSync(dirPath);
};

// identify dest directory
// organize the files
function organizeDirectory(dirPath) {
    // path -> file/folder
    let isFile = isFileChecker(dirPath);
    if(isFile) {
        let destDirectory = GetDestinationDirectory(dirPath);
        copyFiles(dirPath, path.join(orgFilePath, destDirectory, path.basename(dirPath)));
    } else {
        // get children
        let children = readContent(dirPath);
        for(let i = 0; i < children.length; i++) {
            organizeDirectory(path.join(dirPath,children[i]));
        }
    }
}

function GetDestinationDirectory(dirPath) {
    // can also use path.extname(dirPath) - returns .extension
    let ext = dirPath.split(".").pop(); // returns extension

    for(let key in types) {
        // can also use .includes to check
        for(let i = 0; i < types[key].length; i++) {
            if(types[key][i] == ext)
                return key;
        }
    }

    return "others";
}

// copyFileSync(srcPath, destPath) - to copy files from source to destination
function copyFiles(src, dest) {
    fs.copyFileSync(src, dest);
}

organizeDirectory(dirPath)