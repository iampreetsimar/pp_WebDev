function executeHelp() {
    console.log(`
        List of all commands:
        1. node wcat.js filepath - reads and prints content of the file
        2. node wcat.js filepath1, filepath2, .... - reads and prints content of all the files
        3. node wcat.js -s filepath - converts multiple line breaks into a single line break
        4. node wcat.js -n filepath - gives numbering to all the lines
        5. node wcat.js -b filepath - gives numbering to all the non-empty lines
        6. node wcat.js help - list down all the command descriptions
    `);
};

module.exports = {
    help: executeHelp
};