const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterAllButton = document.getElementById("filterAll");
const filterCompletedButton = document.getElementById("filterCompleted");
const filterUncompletedButton = document.getElementById("filterUncompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks to localStorage
function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks with optional filter
// ...existing code...

function renderTasks() {
	taskList.innerHTML = "";
	let filteredTasks = tasks;
	if (currentFilter === "completed") {
		filteredTasks = tasks.filter((task) => task.completed);
	} else if (currentFilter === "uncompleted") {
		filteredTasks = tasks.filter((task) => !task.completed);
	}

	filterAllButton.classList.toggle("ring-2", currentFilter === "all");
	filterCompletedButton.classList.toggle("ring-2", currentFilter === "completed");
	filterUncompletedButton.classList.toggle("ring-2", currentFilter === "uncompleted");

	filteredTasks.forEach((task, index) => {
		const li = document.createElement("li");
		li.className = `flex items-center justify-between p-3 border rounded-lg shadow-sm transition
            ${task.completed ? 'bg-gray-50' : 'bg-white'} hover:shadow-md`;

		li.innerHTML = `
            <span class="flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} text-lg break-words">
                ${task.text}
            </span>
            <div class="flex gap-2 ml-4">
                <button class="toggleButton group px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400
                    ${task.completed
				? 'bg-green-100 hover:bg-green-200 text-green-700'
				: 'bg-green-500 hover:bg-green-600 text-white'}"
                    aria-label="${task.completed ? 'Mark as uncompleted' : 'Mark as completed'}">
                    ${task.completed
				? `<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/>
                        </svg>`
				: `<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>`
			}
                </button>
                <button class="deleteButton group bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label="Delete task">
                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;

		li.querySelector(".toggleButton").addEventListener("click", () => {
			const realIndex = tasks.indexOf(task);
			tasks[realIndex].completed = !tasks[realIndex].completed;
			saveTasks();
			renderTasks();
		});

		li.querySelector(".deleteButton").addEventListener("click", () => {
			const realIndex = tasks.indexOf(task);
			tasks.splice(realIndex, 1);
			saveTasks();
			renderTasks();
		});

		taskList.appendChild(li);
	});

};

// Add task
addButton.addEventListener("click", () => {
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
		tasks.push({ text: taskText, completed: false });
		taskInput.value = "";
		saveTasks();
		renderTasks();
	}
});

// Add with Enter key
taskInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addButton.click();
	}
});

// Filter buttons
filterAllButton.addEventListener("click", () => {
	currentFilter = "all";
	renderTasks();
});
filterCompletedButton.addEventListener("click", () => {
	currentFilter = "completed";
	renderTasks();
});
filterUncompletedButton.addEventListener("click", () => {
	currentFilter = "uncompleted";
	renderTasks();
});

// Initial render
renderTasks();