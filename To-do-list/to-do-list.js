 // GET HTML ELEMENTS

        let TaskTitle = document.getElementById("TaskTitle");
        let Category = document.getElementById("Category");
        let Priority = document.getElementById("Priority");
        let DueDate = document.getElementById("DueDate");

        let AddTaskBtn = document.getElementById("AddTask");
        let Search = document.getElementById("Search");
        let Sort = document.getElementById("Sort");
        let TaskList = document.getElementById("TaskList");

        let TotalCount = document.getElementById("TotalCount");
        let PendingCount = document.getElementById("PendingCount");
        let CompletedCount = document.getElementById("CompletedCount");

        let ClearCompletedBtn = document.getElementById("ClearCompleted");
        let ClearAllBtn = document.getElementById("ClearAll");
        let DarkModeBtn = document.getElementById("DarkMode");

        let FilterButtons = document.querySelectorAll(".filter-btn");


        // TASK ARRAY

        let Tasks = [];
        console.log(Tasks);

        // CURRENT FILTER

        let CurrentFilter = "all";

        // LOAD TASKS FROM LOCAL STORAGE
        let SavedTasks = localStorage.getItem("Tasks");

        if (SavedTasks !== null) {
            Tasks = JSON.parse(SavedTasks);
        }


        // SAVE TASKS

        function SaveTasks() {
            localStorage.setItem("Tasks", JSON.stringify(Tasks));
        }


        // DISPLAY TASKS

        function DisplayTasks() {

            TaskList.innerHTML = "";

            let SearchValue = Search.value.toLowerCase().trim();

            let FilteredTasks = Tasks.filter(function(Task) {

                let MatchesSearch = Task.title
                    .toLowerCase()
                    .includes(SearchValue);

                let MatchesFilter = true;

                if (CurrentFilter === "pending") {
                    MatchesFilter = Task.completed === false;
                }

                if (CurrentFilter === "completed") {
                    MatchesFilter = Task.completed === true;
                }

                return MatchesSearch && MatchesFilter;
            });


            // SORT TASKS

            if (Sort.value === "newest") {

                FilteredTasks.sort(function(a, b) {
                    return b.id - a.id;
                });

            }

            else if (Sort.value === "oldest") {

                FilteredTasks.sort(function(a, b) {
                    return a.id - b.id;
                });

            }

            else if (Sort.value === "priority") {

                let PriorityOrder = {
                    High: 1,
                    Medium: 2,
                    Low: 3
                };

                FilteredTasks.sort(function(a, b) {
                    return PriorityOrder[a.priority] -
                           PriorityOrder[b.priority];
                });

            }

            else if (Sort.value === "dueDate") {

                FilteredTasks.sort(function(a, b) {
                    return a.dueDate.localeCompare(b.dueDate);
                });

            }

            // IF NO TASKS

            if (FilteredTasks.length === 0) {

                let EmptyMessage = document.createElement("li");

                EmptyMessage.classList.add("empty");

                EmptyMessage.textContent = "No tasks found.";

                TaskList.appendChild(EmptyMessage);
            }

            // CREATE TASKS

            FilteredTasks.forEach(function(Task) {

                let Li = document.createElement("li");

                Li.classList.add("task");

                if (Task.completed === true) {
                    Li.classList.add("completed");
                }

                // CHECKBOX

                let Checkbox = document.createElement("input");

                Checkbox.type = "checkbox";

                Checkbox.checked = Task.completed;

                Checkbox.addEventListener("change", function() {

                    Task.completed = Checkbox.checked;

                    SaveTasks();

                    DisplayTasks();
                });


                // TASK INFORMATION

                let TaskInfo = document.createElement("div");

                TaskInfo.classList.add("task-info");


                let Title = document.createElement("div");

                Title.classList.add("task-title");

                Title.textContent = Task.title;

                let Details = document.createElement("div");

                Details.classList.add("task-details");

                Details.innerHTML = `
                    <span class="priority priority-${Task.priority.toLowerCase()}">
                        ${Task.priority}
                    </span>
                    Category: ${Task.category}
                    ${Task.dueDate !== "" ? " | Due: " + Task.dueDate : ""}
                `;


                TaskInfo.appendChild(Title);
                TaskInfo.appendChild(Details);


                // ACTION BUTTONS

                let Actions = document.createElement("div");

                Actions.classList.add("task-actions");

                // EDIT BUTTON

                let EditBtn = document.createElement("button");

                EditBtn.textContent = "Edit";

                EditBtn.addEventListener("click", function() {

                    let NewTitle = prompt("Edit task",Task.title);

                    if (
                        NewTitle !== null && NewTitle.trim() !== ""){

                        Task.title = NewTitle.trim();
                        SaveTasks();
                        DisplayTasks();
                    }
                });

                // DELETE BUTTON

                let DeleteBtn = document.createElement("button");

                DeleteBtn.textContent = "Delete";

                DeleteBtn.addEventListener("click", function() {

                    let ConfirmDelete = confirm("Delete this task?");

                    if (ConfirmDelete === true) {

                        let TaskIndex = Tasks.indexOf(Task);

                        Tasks.splice(TaskIndex, 1);

                        SaveTasks();
                        DisplayTasks();
                    }
                });

                Actions.appendChild(EditBtn);
                Actions.appendChild(DeleteBtn);

                // ADD ELEMENTS

                Li.appendChild(Checkbox);
                Li.appendChild(TaskInfo);
                Li.appendChild(Actions);

                TaskList.appendChild(Li);

            });


            UpdateCounters();
        }

        // ADD TASK

        AddTaskBtn.addEventListener("click", function() {

            let TitleValue = TaskTitle.value.trim();
            let CategoryValue = Category.value;
            let PriorityValue = Priority.value;
            let DueDateValue = DueDate.value;

            if (TitleValue === "") {

                alert("Please enter a task");
                return;
            }

            let Task = {

                id: Date.now(),
                title: TitleValue,
                category: CategoryValue,
                priority: PriorityValue,
                dueDate: DueDateValue,
                completed: false
            };

            Tasks.push(Task);
            SaveTasks();

            TaskTitle.value = "";
            DueDate.value = "";

            DisplayTasks();
        });


        // SEARCH

        Search.addEventListener("input", function() {

            DisplayTasks();

        });

        // FILTER BUTTONS

        FilterButtons.forEach(function(Button) {

            Button.addEventListener("click", function() {

                CurrentFilter = Button.dataset.filter;

                FilterButtons.forEach(function(Btn) {

                    Btn.classList.remove("active");

                });

                Button.classList.add("active");

                DisplayTasks();

            });

        });


        // SORT

        Sort.addEventListener("change", function() {
            DisplayTasks();

        });


        // UPDATE COUNTERS

        function UpdateCounters() {

            let Total = Tasks.length;
            let Completed = Tasks.filter(function(Task) {
                return Task.completed === true;

            }).length;

            let Pending = Total - Completed;

            TotalCount.textContent = Total;
            PendingCount.textContent = Pending;
            CompletedCount.textContent = Completed;
        }


        // CLEAR COMPLETED TASKS

        ClearCompletedBtn.addEventListener("click", function() {

            let ConfirmClear = confirm("Clear all completed tasks?");

            if (ConfirmClear === true) {

                Tasks = Tasks.filter(function(Task) {
                    return Task.completed === false;

                });

                SaveTasks();
                DisplayTasks();
            }

        });


        // CLEAR ALL TASKS

        ClearAllBtn.addEventListener("click", function() {

            if (Tasks.length === 0) {

                alert("There are no tasks to clear.");
                return;
            }


            let ConfirmClear = confirm("Are you sure you want to delete all tasks?");

            if (ConfirmClear === true) {

                Tasks = [];

                SaveTasks();
                DisplayTasks();
            }

        });


        // DARK MODE

        DarkModeBtn.addEventListener("click", function() {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                DarkModeBtn.textContent = "Light Mode";

            }

            else {

                DarkModeBtn.textContent = "Dark Mode";

            }

        });

        // START APPLICATION
        DisplayTasks();