let filterColorButton = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let filter = document.querySelectorAll(".filter");
let body = document.body;
let addTaskButton = document.querySelector(".fa-plus");
let deleteTaskButton = document.querySelector(".fa-trash-alt");
let modes = ["new", "active", "resolved", "failed"];
let deleteState = false;
let uid = new ShortUniqueId();
let tasklistArray = [];

// add tasks from localStorage
if(localStorage.getItem("todoApp")) {
    tasklistArray = JSON.parse(localStorage.getItem("todoApp"));
    for(let i = 0; i < tasklistArray.length; i++) {
        let taskObject = tasklistArray[i];
        createTask(taskObject.description, taskObject.mode, taskObject.id, false);
    }
}

addTaskButton.addEventListener("click", createModal);
deleteTaskButton.addEventListener("click", toggleDeleteState);

function createModal(e) {
    let existingModal = document.querySelector(".modal-container");
    if(existingModal) {
        let taskInput = existingModal.querySelector(".modal-input");
        taskInput.value = "";
        taskInput.focus();
        return;
    }
        
    let modalContainer = document.createElement("div");
    let addButton = e.currentTarget;
    let parendAddButton = addButton.parentNode;
    parendAddButton.classList.add("active-icon");
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
    handleModal(modalContainer, parendAddButton);
}

function handleModal(modalContainer, parendAddButton) {
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
                parendAddButton.classList.remove("active-icon");
                return;
            }

            let todoItem = modalInput.value;
            console.log('"' + todoItem + '"', "was added in the to-do list.");

            modalContainer.remove();
            parendAddButton.classList.remove("active-icon");
            createTask(todoItem, currentSelectedMode, uid(), true);
        }
    });
};

function createTask(todoItem, currentSelectedMode, taskId, fromUI) {
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task-container");
    taskContainer.innerHTML =
        `
            <div class="task-filter ${currentSelectedMode}"></div>
            <div class="task-description-container">
                <h3 class="task-id">#${taskId}</h3>
                <div class="task-description" contenteditable="true">${todoItem}</div>
            </div>
        `;
    
    mainContainer.prepend(taskContainer);

    // add new item to localStorage
    if(fromUI) {
        let taskObject = {
            id: taskId,
            description: todoItem,
            mode: currentSelectedMode
        };
    
        tasklistArray.push(taskObject);
        localStorage.setItem("todoApp", JSON.stringify(tasklistArray));
    }

    let taskFilter = taskContainer.querySelector(".task-filter");
    taskFilter.addEventListener("click", changeTaskMode);
    taskContainer.addEventListener("click", deleteTask);
};

function changeTaskMode(e) {
    // e.currentTarget - where event listener is added
    // e.target - where events happens, if event happening in any of the childs of current target, child will be given
    let taskFilter = e.target;
    let currentMode = taskFilter.classList[1];
    let idxCurrentMode = modes.indexOf(currentMode);
    taskFilter.classList.remove(currentMode);
    taskFilter.classList.add(modes[(idxCurrentMode + 1) % modes.length]);

    // update localStorage
    let taskId = taskFilter.parentNode.querySelector(".task-id").innerText.substring(1);
    for(let i = 0; i < tasklistArray.length; i++) {
        if(tasklistArray[i].id == taskId) {
            tasklistArray[i].mode = modes[(idxCurrentMode + 1) % modes.length];
            break;
        }
    }
    localStorage.setItem("todoApp", JSON.stringify(tasklistArray));
};

function toggleDeleteState(e) {
    let todoItems = mainContainer.querySelector(".task-container");
    if(!todoItems) {
        console.log("No tasks added. To-Do list is empty.");
        return;
    }

    let deleteButton = e.currentTarget;
    let parent = deleteButton.parentNode;
    if(deleteState) {
        parent.classList.remove("active-icon")
    } else {
        parent.classList.add("active-icon");
    }

    deleteState = !deleteState;
}

function deleteTask(e) {
    if(deleteState) {
        let item = e.currentTarget;
        let currentTask = item.querySelector(".task-description").innerText;

        // update localStorage
        let taskId = item.querySelector(".task-id").innerText.substring(1);
        for(let i = 0; i < tasklistArray.length; i++) {
            if(tasklistArray[i].id == taskId) {
                tasklistArray.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("todoApp", JSON.stringify(tasklistArray));

        console.log('"' + currentTask + '"', "was removed from the to-do list.");
        item.remove();

        let todoItems = mainContainer.querySelector(".task-container");
        if(!todoItems) {
            let deleteButton = document.querySelector(".fa-trash-alt");
            let parent = deleteButton.parentNode;
            parent.classList.remove("active-icon");
            deleteState = false;
        }
    }
}