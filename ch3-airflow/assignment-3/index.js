const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

// 1. Function to add a task
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  tasks.push({ taskId, text, priority });

  res.json({ tasks });
});

//2. Function to get all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});


//3. sort tasks by priority
function sortTasksByPriority() {
  return [...tasks].sort((a, b) => a.priority - b.priority);
}

app.get('/tasks/sort-by-priority', (req, res) => {
  res.json({ tasks: sortTasksByPriority() });
});

// 4. Edit task priority
function editTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = editTaskPriority(taskId, priority);
  res.json({ tasks: result });
});

// 5. Edit task text
function editTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break; 
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = editTaskText(taskId, text);
  res.json({ tasks: result });
});


//6. delete a task
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter(task => task.taskId !== taskId);
  res.json({ tasks });
});


//7. filter tasks by priority
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter(task => task.priority === priority);
  res.json({ tasks: result });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
