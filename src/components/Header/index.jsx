import todoLogo from "../../assets/todoLogo.svg";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import logoColorful from "../../assets/logoColorful.png";
import logoPencil from "../../assets/logoPencil.png";



export function Header({ handleAddTask }) {
	const [title, setTitle] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		handleAddTask(title);
		setTitle("");
	}

	function onChangeTitle(event) {
		setTitle(event.target.value);
	}

	return (
		<header className={styles.header}>
			<img src={logoPencil} alt="Logo Pencil" style={{ width: '230px', height: '200px', marginTop: '80px', marginBottom: '80px' }}/>

			{/* <h1 className={styles.heading}>To Do List</h1>*/}
			{/* <img src={todoLogo} alt="To do list" /> <img src={logoColorful} alt="Logo Colorful" style={{ width: '250px', height: '200px' }}/>*/}

			<form onSubmit={handleSubmit} className={styles.newTaskForm}>
				<input
					placeholder="Add a new task"
					type="text"
					onChange={onChangeTitle}
					value={title}
				/>
				<button>
					Create <AiOutlinePlusCircle size={20} />
				</button>
			</form>
		</header>
	);
}
