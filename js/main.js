function onPageLoaded() {
    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.todos");
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        saveButton.addEventListener("click", () => {
            localStorage.setItem("todos", ul.innerHTML);
        });
        clearButton.addEventListener("click", () => {
            ul.innerHTML = "";
            localStorage.removeItem('todos', ul.innerHTML);
        });

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("todo-trash");

        const checkBtn = document.createElement("span");
        checkBtn.classList.add('todo-check');

        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        const icon_check = document.createElement('i');
        icon_check.classList.add("fas", "fa-check");
        checkBtn.appendChild(icon_check);

        icon_check.addEventListener('click', () => {
           li.classList.toggle("checked")
        })

        ul.appendChild(li).append(textSpan, deleteBtn, checkBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn, checkBtn);
    }

  
    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;       
        if (keyPressed.which == keyEnter) {
            createTodo();
        }

    });
        ul.addEventListener("click", onClickTodo);

    
    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }
    
    loadTodos();

}

document.addEventListener("DOMContentLoaded", onPageLoaded);
