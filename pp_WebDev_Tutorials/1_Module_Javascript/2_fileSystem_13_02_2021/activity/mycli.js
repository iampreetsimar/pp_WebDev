/*
    COMMANDS
        1. view --tree, --flat
        2. organize    -> same folder, multiple folder
        3. help

        [node, mycli.js, view, dirName, node]
        node mycli.js organize -/foldername
        node mycli.js help
*/

let { help } = require("./commands/help");
let { view } = require("./commands/view");
let { organize } = require("./commands/organize");

let input = process.argv.slice(2);
let cmd = input[0];

switch(cmd) {
    case "view":
        view();
        break;
    case "organize":
        organize();
        break;
    case "help":
        help();
        break;
    default:
        console.log("Wrong command. Enter help to get a list all commands.");
        break;
}







