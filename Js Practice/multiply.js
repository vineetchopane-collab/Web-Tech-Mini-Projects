let Input = document.getElementById("number");
let ShowBtn = document.getElementById("show");
let ClearBtn = document.getElementById("clear");
let Result = document.getElementById("result");

// Show Multiplication Table

ShowBtn.addEventListener("click", function () {

    let number = Number(Input.value);

    if (Input.value.trim() === "") {
        Result.textContent = "Please enter a number";
        Result.style.color = "red";
        return;
    }

    Result.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        Result.innerHTML += number + " × " + i + " = " + (number * i) + "<br>";   // += Javascript keeps adding new lines to the existing output //
    }                                                                                    

});

// Clear Button

ClearBtn.addEventListener("click", function () {

    if (Input.value.trim() === "") {
        alert("Input field is already empty");
        // return;
    }

    Input.value = "";
    Result.innerHTML = "";
    Result.textContent = "";
    Input.focus();

});

// Enter Key

Input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        ShowBtn.click();
    }

});







// User enters 5
//         │
//         ▼
// number = 5
//         │
//         ▼
// for (i = 1; i <= 10; i++)
//         │
//         ├── i = 1 → 5 × 1 = 5
//         ├── i = 2 → 5 × 2 = 10
//         ├── i = 3 → 5 × 3 = 15
//         ├── ...
//         └── i = 10 → 5 × 10 = 50
//         │
//         ▼
// Display all lines on the page