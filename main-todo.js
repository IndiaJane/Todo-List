
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//If textInput is blank, invoke formValidation() and show error message.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    formValidation();
});

let formValidation = () => {
    //if the input value is blank, console.log failure
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        //IIFE: immediately invoked functional expression. So the popup doesn't go away when input is blank 
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        });
    }
};


let data = [];

//collecting the data from the input and pushing it into the object 'data'
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    });

    localStorage.setItem("data", JSON.stringify(data))
    console.log(data)

    createTask();

};

let createTask = () => {
    tasks.innerHTML += ""
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        <img onClick="updateTask(this)" "data-bs-toggle="modal" data-bs-target="#form" src="/todo-list/images/pen-to-square-solid.png" class="image">
                        <img  onClick="deleteTask(this)" src="/todo-list/images/trash-solid.png" class="image">
    
                    </span>
                </div>`);
    })
    resetForm()
};

let deleteTask = (e) => {
    //jumping from options to the main parent. parentElement > parentElement
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1n);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

let updateTask = (e) => {
    let selectedTask = e.parentElement.parentElement

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    createTask()
})()


