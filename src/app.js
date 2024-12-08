const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterAllButton = document.getElementById("filterAll");
const filterCompletedButton = document.getElementById("filterCompleted");
const filterUncompletedButton = document.getElementById("filterUncompleted");

let tasks = [];

// Funktion zum Hinzufügen einer Aufgabe
addButton.addEventListener("click", () => {
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
		const task = { text: taskText, completed: false };
		tasks.push(task);
		taskInput.value = ""; // Eingabefeld zurücksetzen
		renderTasks();
	}
});

// Funktion zum Rendern der Aufgaben
const renderTasks = () => {
	taskList.innerHTML = ""; // Liste zurücksetzen
	tasks.forEach((task, index) => {
		const li = document.createElement("li");
		li.classList.toggle("completed", task.completed);
		li.innerHTML = `
      <span>${task.text}</span>
      <button class="toggleButton">${
				task.completed ? "Uncompleted" : "Completed"
			}</button>
      <button class="deleteButton">Delete</button>
    `;

		// Erledigt/unerledigt wechseln
		li.querySelector(".toggleButton").addEventListener("click", () => {
			task.completed = !task.completed;
			renderTasks();
		});

		// Aufgabe löschen
		li.querySelector(".deleteButton").addEventListener("click", () => {
			tasks.splice(index, 1);
			renderTasks();
		});

		taskList.appendChild(li);
	});
};

// Filterfunktionen
filterAllButton.addEventListener("click", () => {
	renderTasks();
});

filterCompletedButton.addEventListener("click", () => {
	const completedTasks = tasks.filter((task) => task.completed);
	renderFilteredTasks(completedTasks);
});

filterUncompletedButton.addEventListener("click", () => {
	const uncompletedTasks = tasks.filter((task) => !task.completed);
	renderFilteredTasks(uncompletedTasks);
});

// Gefilterte Aufgaben rendern
const renderFilteredTasks = (filteredTasks) => {
	taskList.innerHTML = "";
	filteredTasks.forEach((task, index) => {
		const li = document.createElement("li");
		li.classList.toggle("completed", task.completed);
		li.innerHTML = `
      <span>${task.text}</span>
      <button class="toggleButton">${
				task.completed ? "Uncompleted" : "Completed"
			}</button>
      <button class="deleteButton">Delete/button>
    `;
		li.querySelector(".toggleButton").addEventListener("click", () => {
			task.completed = !task.completed;
			renderFilteredTasks(filteredTasks);
		});

		li.querySelector(".deleteButton").addEventListener("click", () => {
			tasks.splice(index, 1);
			renderFilteredTasks(filteredTasks);
		});

		taskList.appendChild(li);
	});
};
