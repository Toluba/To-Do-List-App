

document.querySelector("#addBtn").addEventListener('click', function () {
    const inputName = document.querySelector("#creatorsInputName").value;
    const description = document.querySelector("#taskDescription").value;
    const assignedTo = document.querySelector("#taskAssignedToName").value;
    const dueDate = document.querySelector("#inputDueDate").value;
    const status = document.querySelector("#inputStatus").value;

    let allChecksPassed = validateForm(inputName, description, assignedTo, dueDate, status);

    if (allChecksPassed == true) {
        //create an object
        createTaskObject(inputName, description, assignedTo, dueDate, status, taskManager.allTasks);
        let taskIndex = taskManager.allTasks.length - 1;
        taskManager.addTask(taskManager.allTasks[taskIndex])

    }


    // tests
    // console.log(allChecksPassed);
    // console.log(inputName, description, assignedTo, dueDate, status);


    // come back and finish reset
    // document.getElementsByTagName("form").reset();
})

document.addEventListener('click', function (event) {
    // evaulates is what I clicked on a button, the node name is the element associated with it
    const isButton = (event.target.nodeName == 'BUTTON');
    if (isButton) {

        const element = event.target;
        taskManager.deleteTask(element);

    }

    // console.log(element);
    // console.log(thistaskID);
})


// a functiont to validate the input from the form
// come back later to create error messages  check repl
function validateForm(inputName, description, assignedTo, dueDate, status) {
    let allValid = false;

    if (inputName.length >= 3 && (description.length >= 10) && (assignedTo.length >= 3) && (dueDate) && (status != 'Select status')) {
        allValid = true;
    }
    return allValid;
}


// test to check 
// // for(let i = 0; 1< 3; i++){
//     createTaskObject(name, description, assignedTo, dueDate, status)
// }


function createTaskObject(inputName, description, assignedTo, dueDate, status, taskArray) {
    taskManager.allTasks.push({
        "Name": inputName,
        "Description": description,
        "AssignedTo": assignedTo,
        "DueDate": dueDate,
        "Status": status,
        "ID": `${taskArray.length < 1 ? 1 : taskArray.length + 1}`
        // if task arry length is less than 1 then give 1, if the length is more than 1
        // else add 1
    })

    // store array in local storage
    localStorage.setItem("taskArray", JSON.stringify(taskManager.allTasks));
    return taskManager.allTasks;
}


class TaskManager {
    constructor(name) {
        this.allTasks = [];
        this.name = name;
    }

    getAllTask() {
        console.log(this.allTasks);
    }

    addTask(taskObj) {
        //This method needs an object out of the array to do its job

        let cardHTML = ` <div class="col-md-4" taskID="${taskObj.ID}">
                     <div class="card" style="width: 18rem;">
                        <div class="card-header">
                        Task
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Assigned To: ${taskObj.AssignedTo}</li>
                        <li class="list-group-item">Assigned By: ${taskObj.Name}</li>
                        <li class="list-group-item">Due By: ${taskObj.DueDate}</li>
                        <li class="list-group-item">Status:  ${taskObj.Status}</li>
                        <li class="list-group-item">Description: ${taskObj.Description}</li>
                        </ul>
                        <button type="button" class= "btn" btnJob= "delete" deletedID="${taskObj.ID}"> Delete </button>
                    </div>
                </div>`


        let cardsHTMLrow = document.querySelector("#cardsSection");
        cardsHTMLrow.innerHTML += cardHTML;




        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.DueDate} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>
                        `

        let listHTMLrow = document.querySelector("#taskList");
        listHTMLrow.innerHTML += listHTML;

    }

    deleteTask(element) {
        // delete the card, wgere the delete button is pressed
        // delete the corresponding task
        // delete out of the array 

        // this removes the item from the array permenantly

        let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
        for (let i = 0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].ID == thistaskID) {
                this.allTasks.splice(i, 1);
                localStorage.setItem("taskArray", JSON.stringify(taskManager.allTasks));


            }
        }


        // test if items are being deleted from array
        console.log(this.allTasks);

        // removes card
        element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)


        // removes task
        let aElements = document.querySelectorAll('a');
        for (let i = 0; i < aElements.length; i++) {
            element = aElements[i];
            if (element.attributes.taskID.value == thistaskID) {
                element.parentNode.removechild(element);
            }
        }



    }
    // come back to do another time 
    updateTask() { 

    }
}



let taskManager = new TaskManager("tasks");


//gets data back from local storage
let dataReturned = localStorage.getItem("taskArray");

if (dataReturned) {
    taskManager.allTasks = JSON.parse(dataReturned);
    populatePage(taskManager.allTasks)
} else {
    taskManager.taskArray = [];
}



function populatePage(array) {
    for (let i = 0; i < array.length; i++) {
        taskManager.addTask(array[i]);
    }
}







