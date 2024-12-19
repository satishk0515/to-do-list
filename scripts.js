document.addEventListener('DOMContentLoaded', function () {
    const todoList = JSON.parse(localStorage.getItem('todos')) || [];
    const todoListElement = document.getElementById('todoList');

    function renderTodos() {
        todoListElement.innerHTML = '';
        todoList.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-white';
            li.textContent = `${todo.task} - ${new Date(todo.dateTime).toLocaleString()}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.onclick = function () {
                removeTodo(index);
            };

            li.appendChild(deleteBtn);
            todoListElement.appendChild(li);
        });
    }

    function addTodo(task, dateTime) {
        if (task.trim() !== '' && dateTime !== '') {
            todoList.push({ task, dateTime });
            localStorage.setItem('todos', JSON.stringify(todoList));
            renderTodos();
        }
    }

    function removeTodo(index) {
        todoList.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todoList));
        renderTodos();
    }

    document.getElementById('addBtn').addEventListener('click', function () {
        const todoInput = document.getElementById('todoInput');
        const dateTimeInput = document.getElementById('dateTimeInput');
        addTodo(todoInput.value, dateTimeInput.value);
        todoInput.value = '';
        dateTimeInput.value = '';
    });

    renderTodos();
});
