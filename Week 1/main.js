// Simple Todo List with localStorage
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todos = getTodos();
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        if (todo.editing) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = todo.text;
            editInput.className = 'edit-input';
            editInput.onkeydown = (e) => {
                if (e.key === 'Enter') saveEdit(idx, editInput.value);
            };
            li.appendChild(editInput);
            const actions = document.createElement('div');
            actions.className = 'actions';
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.onclick = () => saveEdit(idx, editInput.value);
            actions.appendChild(saveBtn);
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => cancelEdit(idx);
            actions.appendChild(cancelBtn);
            li.appendChild(actions);
        } else {
            const span = document.createElement('span');
            span.textContent = todo.text;
            li.appendChild(span);
            const actions = document.createElement('div');
            actions.className = 'actions';
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => editTodo(idx);
            actions.appendChild(editBtn);
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => deleteTodo(idx);
            actions.appendChild(delBtn);
            li.appendChild(actions);
        }
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    const todos = getTodos();
    todos.push({ text });
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
}

function deleteTodo(idx) {
    const todos = getTodos();
    todos.splice(idx, 1);
    saveTodos(todos);
    renderTodos();
}

function editTodo(idx) {
    const todos = getTodos();
    todos.forEach((t, i) => t.editing = i === idx);
    saveTodos(todos);
    renderTodos();
}

function saveEdit(idx, newText) {
    const todos = getTodos();
    todos[idx].text = newText.trim();
    delete todos[idx].editing;
    saveTodos(todos);
    renderTodos();
}

function cancelEdit(idx) {
    const todos = getTodos();
    delete todos[idx].editing;
    saveTodos(todos);
    renderTodos();
}

todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTodo();
});

window.onload = renderTodos;
