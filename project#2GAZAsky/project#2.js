
const readline = require('readline-sync'); //for input by terminal

function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

Task.prototype.complete = function() {
  this.completed = true;
};

var taskList = [];


function addTask() {
  var description = readline.question("Enter task description: ");
  var dueDate = readline.question("Enter task by date (YYYY-MM-DD): ");
  var priority = readline.question("Enter task priority (high, medium, low): ");
  var task = new Task(description, dueDate, priority);
  taskList.push(task);
  console.log("Task added: " + description);
}

function completeTask() {
  var description = readline.question("Enter task description: ");
  var task = taskList.find(function(task) {
    return task.description === description;
  });
  if (task) {
    task.complete();
    console.log("Task completed: " + description);
  } else {
    console.log("Task not found!");
  }
}


function deleteTask() {
  var description = readline.question("Enter task description: ");
  var index = taskList.findIndex(function(task) {
    return task.description === description;
  });
  if (index !== -1) {
    taskList.splice(index, 1);
    console.log("Task deleted: " + description);
  } else {
    console.log("Task not found!");
  }
}

function filterTasks() {
  var filter = readline.question("Enter filter (completed or incomplete): ");
  var filteredList;
  if (filter === "completed") {
    filteredList = taskList.filter(function(task) {
      return task.completed === true;
    });
  } else if (filter === "incomplete") {
    filteredList = taskList.filter(function(task) {
      return task.completed === false;
    });
  }
  console.log("Filtered tasks:");
  console.log(filteredList);
}


function sortTasks() {
  var sort = readline.question("Enter sort by date or priority): ");
  if (sort === "by date") {
    taskList.sort(function(a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (sort === "priority") {
    taskList.sort(function(a, b) {
      var priorityA = a.priority.toLowerCase();
      var priorityB = b.priority.toLowerCase();
      if (priorityA < priorityB) return -1;
      if (priorityA > priorityB) return 1;
      return 0;
    });
  }
  console.log("Sorted tasks:");
  console.log(taskList);
}


function printActions() {
  console.log("To-do list actions:");
  console.log("add -> add a new task to the list");
  console.log("complete -> mark a task as completed");
  console.log("delete -> delete a task from the list");
  console.log("filter -> filter the list by completed or incomplete tasks");
  console.log("sort -> sort the list by due date or priority");
}



while (true) {
  var action = readline.question("Enter an action or press 'help' for a list of actions): ");
  if (action === "help") {
    printActions();
  } else if (action === "add") {
    addTask();
  } else if (action === "complete") {
    completeTask();
    } else if (action === "delete") {
        
      deleteTask();
    } else if (action === "filter") {
      filterTasks();
    } else if (action === "sort") {
      sortTasks();
    } else {
      console.log("Invalid action. press 'help' for a list of actions.");
    }
  }