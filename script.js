const ui = {
    input: document.querySelector("#input"),
    form: document.querySelector("#form"),
    taskStatusContent: document.querySelector("#taskStatusContent"),
    taskContent: document.querySelector("#taskContent"),
    jsStatus: document.querySelectorAll(".js-status"),
};

const tasks = [
    {
        text: "Task 1",
        status: 0,
    },
    {
        text: "Task 2",
        status: 1,
    },
];

let editTaskIndex = "";

ui.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = ui.input.value;
    if (text.trim()) {
        console.log(editTaskIndex, "editTaskIndex");
        if (editTaskIndex) {
            tasks[editTaskIndex].text = text;
            editTaskIndex = "";
        } else {
            tasks.unshift({
                text: text,
                status: 0,
            });
        }
        ui.input.value = "";
        ui.input.focus();
        createTasks();
    }
});

function deleteTask(index) {
    console.log(index);
    tasks.splice(index, 1);
    console.log(tasks);
    createTasks();
}
function editTask(index) {
    ui.input.value = tasks[index].text;
    ui.input.focus();
    editTaskIndex = index;
}

ui.taskContent.addEventListener("click", (e) => {
    const obj = e.target.closest("button")
        ? e.target.closest("button")
        : e.target;

    if (obj.tagName === "BUTTON") {
        const type = obj.getAttribute("data-type");

        const parent = obj.closest("[data-index]");
        const index = parent.getAttribute("data-index");

        if (type === "delete") {
            deleteTask(index);
        } else if (type === "edit") {
            editTask(index);
        }
    }
});

const createTasks = (status) => {
    ui.taskContent.innerHTML = "";
    for (let index in tasks) {
        if (status) {
            if (tasks[index].status === parseInt(status)) {
                ui.taskContent.innerHTML += taskItem(index);
            }
        } else {
            ui.taskContent.innerHTML += taskItem(index);
        }
    }

    for (let val of document.querySelectorAll("#taskStatusContent button")) {
        if (status === val.getAttribute("data-status")) {
            val.classList.add("bg-gray-200");
        } else {
            val.classList.remove("bg-gray-200");
        }
    }

    for (let input of document.querySelectorAll(".js-status")) {
        input.addEventListener("change", (e) => {
            const parent = e.target.closest("[data-index]");
            const index = parent.getAttribute("data-index");
            tasks[index].status = e.target.checked ? 1 : 0;
            createTasks();
        });
    }
};
createTasks();

addEventListener("change", (e) => {
    createTasks();
});

function taskItem(index) {
    const task = tasks[index];
    return `
    <div data-index="${index}" class="flex justify-between items-center border border-gray-300 rounded p-2">
                    <label class="flex js-status items-center gap-2 cursor-pointer ${
                        !!task.status && "line-through"
                    }">
                        <input ${!!task.status && "checked"} type="checkbox" >
                        <span class="capitalize">${task.text}</span>
                    </label>
                    
                    <div >
                        <button
                        data-type='edit'
                            class="bg-blue-500 text-white text-xs size-[28px] rounded"
                        >
                            <i class="fa fa-pen"></i>
                        </button>
                        <button
                        data-type='delete'
                            class="bg-red-500 text-white text-xs size-[28px] rounded"
                        >
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>`;
}

ui.taskStatusContent.addEventListener("click", (e) => {
    const status = e.target.getAttribute("data-status");
    createTasks(status);
});
