const todoList = [
    {
        id: 1,
        title: "Einkaufen",
        todos: [
            "Milch kaufen",
            "Brot kaufen",
            "Äpfel kaufen"
        ]
    },
    {
        id: 2,
        title: "Arbeit",
        todos: [
            "E-Mails beantworten",
            "Meeting vorbereiten"
        ]
    }
];

const accordion = document.getElementById('accordion_list');
todoList.forEach(list => {
    accordion.innerHTML += `
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${list.id}" aria-expanded="false" aria-controls="collapse-${list.id}">
                <b>${list.title}</b>
            </button>
        </h2>
        <div id="collapse-${list.id}" class="accordion-collapse collapse" data-bs-parent="#accordion_list">
            <div class="accordion-body">
                ${list.todos.map(todo => `
                    <li class="ms-3">${todo}</li>
                `).join("")}
            </div>
        </div>
    </div>
    `;
});