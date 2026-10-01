let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

const form = document.getElementById('todo_form');
const accordion = document.getElementById('accordion_list');
renderTodoList();
updateDateTime();
setInterval(updateDateTime, 1000);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    storeNewTodo();
})

function storeNewTodo() {
    console.log("New todo gets stored.");

    const todoNameInput = document.getElementById('todo_name_input');
    const textFieldInput = document.getElementById('text_field_input');

    const todoTexts = textFieldInput.value
        .split("\n")
        .map(todo => todo.trim())
        .filter(todo => todo !== "");

    const todos = todoTexts.map(text => ({
        id: generateUniqueId(),
        text: text,
        done: false
    }));

    let newTodo = {
        id: generateUniqueId(),
        title: todoNameInput.value,
        todos: todos
    };

    todoList.push(newTodo);

    saveTodoList();

    renderTodoList();

    todoNameInput.value = "";
    textFieldInput.value = "";
}

function deleteTodo(id) {
    console.log("Deleting Todo with id: " + id);
    todoList = todoList.filter(list => String(list.id) !== String(id));

    saveTodoList();
    renderTodoList();
}

function saveTodoList() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function renderTodoList() {
    accordion.innerHTML = "";

    todoList.forEach(list => {
        accordion.innerHTML += `
    <div class="accordion-item">
        <h2 class="accordion-header d-flex align-items-center">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${list.id}" aria-expanded="false" aria-controls="collapse-${list.id}">
                <b>${list.title}</b>
            </button>
                
            <button class="btn btn-primary ms-2 me-2" type="button" onclick="deleteTodo('${list.id}')">
                <i class="bi bi-trash3"></i>
            </button>
        </h2>
      
        <div id="collapse-${list.id}" class="accordion-collapse collapse" data-bs-parent="#accordion_list">
            <div class="accordion-body">
                 ${list.todos.map(todo => `
                    <div class="form-check mb-2 d-block">
                        <input id="todo-${todo.id}" type="checkbox" class="" ${todo.done ? "checked" : ""} onchange="toggleTodo('${list.id}', '${todo.id}', this)">
                        <label for="todo-${todo.id}" class="form-check-label ${todo.done ? 'todo-done text-muted' : ''}">
                            ${todo.text}
                        </label>
                    </div>
                 `).join("")}
            </div>
        </div>
    </div>
    `
    });
}

function generateUniqueId() {
    return crypto.randomUUID()
}

function toggleTodo(listId, todoId) {
    const list = todoList.find(list => list.id === listId);
    if (!list) {
        return;
    }

    const todo = list.todos.find(todo => todo.id === todoId);
    if (!todo) {
        return;
    }
    todo.done = !todo.done;
    saveTodoList();

    const label = document.querySelector(`label[for="todo-${todoId}"]`);
    label.classList.toggle("todo-done", todo.done);
    label.classList.toggle("text-muted", todo.done);
}

function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("de-DE");
    const time = now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("currentDate").textContent = date;
    document.getElementById("currentTime").textContent = time;
}
