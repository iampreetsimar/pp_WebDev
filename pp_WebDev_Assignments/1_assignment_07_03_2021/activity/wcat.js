/*
    COMMANDS
        1. node wcat.js filepath - reads and prints content of the file
        2. node wcat.js filepath1, filepath2, .... - reads and prints content of the files
        3. node wcat.js -s filepath - converts multiple line breaks into a single line break
        4. node wcat.js -n filepath - gives numbering to all the lines
        5. node wcat.js -b filepath - gives numbering to all the non-empty lines
        6. node wcat.js help - list down all the command descriptions

        Edge Cases:
            1. if file is not found - print file does not exist
            2. -n and -b are mutually exclusive commands. If both are provided, run the one used first


        NOTE - IF -s IS PRESENT IN THE COMMAND, IT WILL RUN FIRST IN ORDER TO KEEP THE LINE NUMBERING CORRECT
*/

let { help } = require("./commands/help");
let { read } = require("./commands/display");
let { singleLineBreak } = require("./commands/singleLineBreak");
let { numberLines } = require("./commands/numberingLines");

let input = process.argv.slice(2);
try {
    switch(input[0]) {
        case "-s":
            singleLineBreak(input.slice(1));
            break;
        case "-n":
            numberLines(input.slice(1), "-n");
            break;
        case "-b":
            numberLines(input.slice(1), "-b");
            break;
        case "help":
            help();
            break;
        default:
            read(input);
            break;
    };
} catch (ex) {
    console.log(ex);
}