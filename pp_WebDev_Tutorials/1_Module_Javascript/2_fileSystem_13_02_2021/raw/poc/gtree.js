let root = {
    name: "d10",
    children: [
        {
            name: "d20",
            children: [
                {
                    name: "d40",
                    children: []
                }
            ]
        }, 
        {
            name: "d30",
            children: [
                {
                    name: "d50",
                    children: []
                },
                {
                    name: "d60",
                    children: []
                }
            ]
        }
    ] 
}

function printGTree(root) {
    let printMeAndFamily = root.name + " -> ";
    for(let i = 0; i < root.children.length; i++) {
        printMeAndFamily += root.children[i].name;
        if(i < root.children.length - 1)
            printMeAndFamily += ", "
    }
    console.log(printMeAndFamily);

    for(let i = 0; i < root.children.length; i++) {
        printGTree(root.children[i]);
    }
}

// function printFlatStyleTree(root, path) {
//     let pathSoFar = path + "/" + root.name;
//     console.log(pathSoFar);
//     for(let i = 0; i < root.children.length; i++) {
//         printFlatStyleTree(root.children[i], pathSoFar);
//     }
// }

// function printTreeStyleTree(root, level) {
//     let path = "";
//     for(let i = 0; i < level; i++) {
//         path += "\t";
//     }
//     path += root.name;
//     console.log(path);

//     for(let i = 0; i < root.children.length; i++) {
//         printTreeStyleTree(root.children[i], level + 1);
//     }
// }

//console.log("************ Normal Style *****************");
printGTree(root);
// console.log("************ Flat Style *****************");
// printFlatStyleTree(root, "");
// console.log("************ Tree Style *****************");
// printTreeStyleTree(root, 0);