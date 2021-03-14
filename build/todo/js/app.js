// CODE EXPLAINED channel
//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.lenght; //set the id to the last one in the list
    loadList(LIST); // load the list to the UI
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to UI
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });    
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
} )

//Show Date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                        <i class="fa ${DONE} co" job = "complete" id = "${id}" ></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// ad an item when user hits enter
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // if input isnt empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to localstorage (everywhere the list is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// ad an item when user clicks add icon
add.addEventListener("click", function (even) {
        const toDo = input.value;
        // if input isnt empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to localstorage (everywhere the list is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
});

//complete to do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target;   //return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage (everywhere the list is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});