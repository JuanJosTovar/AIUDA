let editingTask = null;

function addTask() {
    var taskText = document.getElementById("taskInput").value;
    var newTask = createTaskElement(taskText);
    document.querySelector(".tareas-container").appendChild(newTask);
    document.getElementById("taskInput").value = "";
}

function createTaskElement(taskText) {
    var newTask = document.createElement("div");
    newTask.className = "tarea";
    newTask.dataset.originalText = taskText; // Almacenamos el texto original
    newTask.innerHTML = `
        <p class="descripcion">${taskText}</p>
        <button class="puntos" onclick="editTask(this.parentNode)">Editar</button>
        <button class="puntos" onclick="deleteTask(this.parentNode)">Eliminar</button>
    `;

    newTask.setAttribute("draggable", "true");
    newTask.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", taskText);
        event.currentTarget.style.opacity = "0.5"; // Hacer la tarea semitransparente al arrastrar
    });

    newTask.addEventListener("dragend", function (event) {
        event.currentTarget.style.opacity = "1"; // Restaurar la opacidad después de arrastrar
    });

    return newTask;
}

function editTask(task) {
    var descripcion = task.querySelector(".descripcion");
    var editButton = task.querySelector(".puntos");

    if (editButton.textContent === "Editar") {
        descripcion.contentEditable = true;
        descripcion.focus();
        editButton.textContent = "Guardar";
    } else {
        descripcion.contentEditable = false;
        editButton.textContent = "Editar";

        // Actualiza la tarea editada y el texto original
        var editedText = descripcion.textContent;
        task.dataset.originalText = editedText;
    }
}

function deleteTask(task) {
    task.remove();
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var target = document.getElementById(targetId);

    // Eliminamos la tarea del tablero original si ya estaba en otro tablero
    var existingTask = document.querySelector(".tarea[data-original-text='" + data + "']");
    if (existingTask) {
        existingTask.remove();
    }

    // Creamos una nueva tarea y la agregamos al tablero de destino
    var newTask = createTaskElement(data);
    target.appendChild(newTask);
}