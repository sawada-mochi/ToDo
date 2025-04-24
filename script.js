const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを1つ描画
function renderTask(task, index) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.addEventListener('change', () => {
    tasks[index].done = checkbox.checked;
    saveTasks();
    renderTasks();
  });

  const span = document.createElement('span');
  span.textContent = task.text;
  if (task.done) {
    span.style.textDecoration = 'line-through';
    span.style.opacity = 0.5;
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

// タスク一覧を描画
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => renderTask(task, index));
}

// タスク追加
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
});

// 保存
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 初期表示
renderTasks();
