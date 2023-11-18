import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { BsPencilFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useState } from 'react';

export function Task({ task, onDelete, onComplete, onEdit, onSave}) {

    const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(task.id);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(task.id, editedTitle);
  };

	return (
		<div className={styles.task}>
			<button
				className={styles.checkContainer}
				onClick={() => onComplete(task.id)}
			>
				{task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
			</button>

            {isEditing ? (
                    <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                    className={styles.taskInput}
                    />
                ) : (

                <p className={task.isCompleted ? styles.textCompleted : ""}>
                    {task.title}
                </p>

                )}

            <button className={isEditing ? styles.saveButton : styles.editButton} onClick={isEditing ? handleSave : handleEdit}>
                    {isEditing ? <FaCheck size={16} /> : <BsPencilFill size={16} />} {/* Conditional icon rendering */}
                </button>

                <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                    <TbTrash size={20} />
                </button>
                </div>
         );
    }