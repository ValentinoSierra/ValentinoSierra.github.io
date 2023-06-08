// Obtener elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Crear un array para almacenar las tareas
let tasks = [];

// Función para agregar una tarea
function addTask(e) {
  e.preventDefault(); // Evitar el envío del formulario

  const taskText = input.value.trim(); // Obtener el texto de la tarea sin espacios en blanco

  if (taskText !== '') {
    // Crear objeto de tarea
    const task = {
      id: Date.now(), // Generar un ID único para la tarea
      text: taskText
    };

    tasks.push(task); // Agregar la tarea al array

    // Agregar la tarea como un elemento de la lista en el HTML
    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Eliminar</button>
      <button class="edit-btn">Editar</button>
    `;
    taskList.appendChild(taskItem);

    // Limpiar el campo de entrada de texto
    input.value = '';
  }
}

// Función para eliminar una tarea
function deleteTask(e) {
  if (e.target.classList.contains('delete-btn')) {
    const taskId = e.target.parentElement.getAttribute('data-id');
    tasks = tasks.filter(task => task.id !== parseInt(taskId)); // Filtrar el array y eliminar la tarea

    // Eliminar el elemento de la lista en el HTML
    e.target.parentElement.remove();
  }
}

// Función para editar una tarea
function editTask(e) {
  if (e.target.classList.contains('edit-btn')) {
    const taskId = e.target.parentElement.getAttribute('data-id');
    const taskText = prompt('Editar tarea', e.target.parentElement.firstChild.textContent);

    if (taskText !== null) {
      const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
      tasks[taskIndex].text = taskText;

      // Actualizar el texto de la tarea en el HTML
      e.target.parentElement.firstChild.textContent = taskText;
    }
  }
}

// Escuchar el evento de envío del formulario
form.addEventListener('submit', addTask);

// Escuchar los eventos de clic en los botones de eliminar y editar tareas
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', editTask);
