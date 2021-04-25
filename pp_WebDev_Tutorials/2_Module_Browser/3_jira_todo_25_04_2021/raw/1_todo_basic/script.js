let inputElement = document.querySelector(".user-input");
let taskList = document.querySelector(".task-list");

inputElement.focus();

// keypress event on input element
inputElement.addEventListener("keypress", function(e) {
    // browser gives an event 'e' object when an event occurs
    if(e.key == "Enter") {
        // get value from input element
        let taskName = inputElement.value;

        // create a new element
        let newTask = document.createElement("li");

        // add value to this element
        newTask.innerText = taskName;

        // add class to the element
        newTask.setAttribute("class", "task");

        // adding event listener on the new element
        newTask.addEventListener("dblclick", function() {
            // delete the element
            this.remove();
            console.log('"' + this.innerText + '"', "was removed from the to-do list");
            inputElement.focus();
        });

        // append this element to this parent - adds to the last
        taskList.appendChild(newTask);

        // setting input element value to empty
        inputElement.value = "";
        
        console.log('"' + taskName + '"' , "was added to the to-do list");
    }
});