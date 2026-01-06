// JavaScript logic for the todo application

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addTodoButton = document.getElementById('add-todo');

let todos = [];

// Load todos from localStorage
const loadTodos = () => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
};

// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Render the todo list
const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
};

// Add a new todo
const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
};

// Delete a todo by id
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
};

addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initial load
loadTodos();
renderTodos();