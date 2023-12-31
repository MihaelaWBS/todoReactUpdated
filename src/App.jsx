import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = "todo:tasks";

function App() {
	const [tasks, setTasks] = useState([]);

	function loadSavedTasks() {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (saved) {
			setTasks(JSON.parse(saved));
		}
	}

	function setTasksAndSave(newTasks) {
		setTasks(newTasks);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
	}

	useEffect(() => {
		loadSavedTasks();
	}, []);

	function addTask(taskTitle) {
		if (!taskTitle.trim()) {
			alert("Please enter a task title.");
			return;
		}

		setTasksAndSave([
			...tasks,
			{
				id: crypto.randomUUID(),
				title: taskTitle,
				isCompleted: false,
			},
		]);
	}

	function saveTaskById(taskId, newTitle) {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					title: newTitle,
				};
			}
			return task;
		});
		setTasksAndSave(newTasks);
	}

	function deleteTaskById(taskId) {
		const newTasks = tasks.filter((task) => task.id !== taskId);
		setTasksAndSave(newTasks);
	}

	function toggleTaskCompletedById(taskId) {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					isCompleted: !task.isCompleted,
				};
			}
			return task;
		});
		setTasksAndSave(newTasks);
	}

	return (
		<>
			<Header handleAddTask={addTask} />
			<Tasks
				tasks={tasks}
				onDelete={deleteTaskById}
				onComplete={toggleTaskCompletedById}
				onSave={saveTaskById}
			/>
		</>
	);
}

export default App;
