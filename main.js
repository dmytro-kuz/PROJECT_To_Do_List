const addTaskBtn = document.querySelector('.btn-add');
const taskInput = document.querySelector('.task-add');
const myTasks = document.querySelector('.my-tasks');


let tasks ;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let toDoItemElems =[];


function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
  <div class="task ${task.completed ? 'checked' : ''}">
    <p class="list-content">
    ${task.description}
    </p>
    <div class="icons">
    <input onclick ='completeTask(${index})' type="checkbox" class="done" ${task.completed ? 'checked' : ''} />
    <img onclick='deleteTask(${index})' class="bin" src="images/bin.svg" alt="bin"/>  
    </div>
    </div>  
  `
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item =>item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item =>item.completed == true);
  tasks = [...activeTasks, ... completedTasks];
}

const fillHtmlList = () => {
  myTasks.innerHTML = '';
  if(tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      myTasks.innerHTML += createTemplate(item, index);
    })
    toDoItemElems = document.querySelectorAll('.task')
  }
}

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    toDoItemElems[index].classList.add('checked');
  }
  else {
    toDoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

const deleteTask =(index) => {
  toDoItemElems[index].classList.add('delition')
  setTimeout(() => {
      tasks.splice(index, 1);
      updateLocal();
      fillHtmlList();
  
  }, 1000)
}

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(taskInput.value));
  updateLocal();
  fillHtmlList();
  taskInput.value = '';
})



// -----------Change day-night mode------

function changeMode() {
  document.body.classList.toggle('white-mode');
  let nav = document.querySelectorAll('.week-day');
  nav.forEach(element => {
      element.classList.toggle('a-change-mode');
  });
  document.querySelector('.turn-on-off').classList.toggle('turn-on-off-move');

}

document.querySelector('.turn-on-off').addEventListener('click', changeMode);


// // -----------Change active day------

// const days = document.querySelectorAll('.day');

// function deactive (day) {
// day.classList.remove('active')
// }

// function selectThis () {
// days.forEach(deactive)
// this.classList.toggle('active')
// }

// days.forEach(function (day) {
// day.addEventListener('click', selectThis)
// })
// // ----------------------------------------------------------




