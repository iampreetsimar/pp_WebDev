let filterColorButton = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let filter = document.querySelectorAll(".filter");

for(let i = 0; i < filterColorButton.length; i++) {
    filterColorButton[i].addEventListener("click", function(e) {
        // to fetch class added to the button
        let filterColor = filterColorButton[i].classList[1];
        if(filterColor == "new") {
            mainContainer.style.backgroundColor = "black";
        } else if(filterColor == "active") {
            mainContainer.style.backgroundColor = "darkseagreen";
        } else if(filterColor == "resolved") {
            mainContainer.style.backgroundColor = "cornflowerblue";
        } else {
            mainContainer.style.backgroundColor = "crimson";
        }
    })
}
