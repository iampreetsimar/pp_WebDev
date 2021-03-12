function executeHelp() {
    // for multiple line strings - use backtick `
    console.log(`List of all commands:
    1. view <dir-name> --tree
    2. view <dir-name> --flat
    3. organize <dir-name>/_
    4. help
`);
};

module.exports = {
    help: executeHelp
};