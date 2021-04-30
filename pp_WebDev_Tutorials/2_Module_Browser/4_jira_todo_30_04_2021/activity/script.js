let filterColorButton = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let filter = document.querySelectorAll(".filter");
let body = document.body;
let addTask = document.querySelector(".fa-plus");
let deleteTask = document.querySelector(".fa-trash-alt");
let modes = ["new", "active", "resolved", "failed"];

// for(let i = 0; i < filterColorButton.length; i++) {
//     filterColorButton[i].addEventListener("click", function(e) {
//         // to fetch class added to the button
//         let filterColor = filterColorButton[i].classList[1];
//         if(filterColor == "new") {
//             mainContainer.style.backgroundColor = "black";
//         } else if(filterColor == "active") {
//             mainContainer.style.backgroundColor = "darkseagreen";
//         } else if(filterColor == "resolved") {
//             mainContainer.style.backgroundColor = "cornflowerblue";
//         } else {
//             mainContainer.style.backgroundColor = "crimson";
//         }
//     })
// }

addTask.addEventListener("click", createModal);

function createModal() {
    let modalContainer = document.createElement("div");
    let actionsList = document.querySelectorAll(".actions");
    let addButton = actionsList[0];
    addButton.style.backgroundColor = "darkslategrey";
    modalContainer.setAttribute("class", "modal-container");
    modalContainer.innerHTML = 
        `
            <div class="input-container">
                <textarea class="modal-input" placeholder="Enter your to-do item here..."></textarea>
            </div>
            <div class="modal-filter-container">
                <div class="filter new"></div>
                <div class="filter active"></div>
                <div class="filter resolved"></div>
                <div class="filter failed"></div>
            </div>
        `;

    body.appendChild(modalContainer);
    handleModal(modalContainer, addButton);
}

function handleModal(modalContainer, addButton) {
    let modalInput = document.querySelector(".modal-input");
    modalInput.focus();

    let modalFilters = document.querySelectorAll(".modal-filter-container .filter");
    
    // remove previous attributes
    // modalFilters[3].setAttribute("class", "border-class");

    modalFilters[0].classList.add("border-class");
    let currentSelectedMode = modalFilters[0].classList[1];
    for(let i = 0; i < modalFilters.length; i++) {
        modalFilters[i].addEventListener("click", function(e) {
            // remove border from all modes
            modalFilters.forEach((filter) => {
                filter.classList.remove("border-class");
            });

            // add border on the current clicked mode
            modalFilters[i].classList.add("border-class");
            currentSelectedMode = modalFilters[i].classList[1];
        })
    }

    modalInput.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            if(modalInput.value == "") {
                modalContainer.remove();
                addButton.style.backgroundColor = "rgb(73, 107, 107)";
                return;
            }

            let todoItem = modalInput.value;
            console.log('"' + todoItem + '"', "was added in the to-do list.");

            modalContainer.remove();
            addButton.style.backgroundColor = "rgb(73, 107, 107)";
            createTask(todoItem, currentSelectedMode);
        }
    });
};

function createTask(todoItem, currentSelectedMode) {
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task-container");
    taskContainer.innerHTML =
        `
            <div class="task-filter ${currentSelectedMode}"></div>
            <div class="task-description-container">
                <h3 class="task-id">#example</h3>
                <div class="task-description" contenteditable="true">${todoItem}</div>
            </div>
        `;
    
    mainContainer.prepend(taskContainer);
    let taskFilter = taskContainer.querySelector(".task-filter");
    taskFilter.addEventListener("click", changeTaskMode);
};

function changeTaskMode(e) {
    // e.currentTarget - where event listener is added
    // e.target - where events happens, if event happening in any of the childs of current target, child will be given
    let taskFilter = e.target;
    let currentMode = taskFilter.classList[1];
    let idxCurrentMode = modes.indexOf(currentMode);
    taskFilter.classList.remove(currentMode);
    taskFilter.classList.add(modes[(idxCurrentMode + 1) % modes.length]);
};
