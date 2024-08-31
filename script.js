showTask();
const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");

const saveBtn = document.querySelector("#saveBtn");
const saveIndex = document.querySelector("#saveIndex");

addBtn.addEventListener("click", ()=>{
    let addTaskInputVal = inputBox.value;
    if(addTaskInputVal.trim() != 0){
        let webTask = localStorage.getItem("localTask");
        if(webTask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(addTaskInputVal);
        localStorage.setItem("localTask", JSON.stringify(taskObj));

    }
    inputBox.value = "";
    showTask();
})

function showTask(){
    // show date
const d = new Date();
let day = String(d.getDate()).padStart(2, "0");
let month = String(d.getMonth() + 1).padStart(2, "0");
    let webTask = localStorage.getItem("localTask");
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let html = "";
    const addedTasklist = document.querySelector("#addedTasklist");
    taskObj.forEach((item, index)=>{
        html += `   <tr class="border">
                    <td id="serial">${index+1}</td>
                    <td><p class="form-control" name="" id="list" multiple>${item}</p></td>
                    <td id="date"><span>${day}</span> / <span>${month}</span></td>

                    <td class="cursor-pointer"><button onclick="editTask(${index})" class="text-white rounded-md bg-green-500 hover:bg-[#0be90b] px-5 py-2" id="deleted" type="button">Edit</button></td>
                    <td id="edit" class="cursor-pointer"><button onclick="deleteTask(${index})" class="text-white rounded-md bg-red-500 hover:bg-red-900 px-5 py-2" type="button">Delete</button></td>
                </tr>`
    });
    addedTasklist.innerHTML = html;
}

// check status
const statusCheck = document.querySelector("#check");
const statusUncheck = document.querySelector("#uncheck");
function check(index){
    taskObj[index] = !taskObj[index];
    statusCheck.style.display ="none";
    statusUncheck.style.display = "block";
}

function uncheck(index){
    taskObj[index] = !taskObj[index];
    statusUncheck.style.display = "none";
    statusCheck.style.display ="block";
}

// edit task
function editTask(index){
    saveIndex.value = index;
    // let webTask = localStorage.getItem("localTask");
    // let taskObj = JSON.parse(webTask);
    inputBox.value = taskObj[index];
    addBtn.style.display = "none";
    saveBtn.style.display = "block";
}

// save task
saveBtn.addEventListener("click", ()=>{
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj[saveIndex.value] = inputBox.value;
    saveBtn.style.display = "none";
    addBtn.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    inputBox.value = "";
    showTask();
})

// delete task
function deleteTask(index){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
}
