import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";


export default function Task({
  task,
  deleteTask,
  editTask,
  updateTask,
  idEdit,
  handleEditInputChange,
  handleEditDescriptionChange,
  handleEditInputCheckbox,
}) {
  const isEditing = idEdit === task.id;

  return (
    <div>
      <div className="task">
        <input
          type="checkbox"
          checked={task?.completed ? true : false}
          onChange={(e) => handleEditInputCheckbox(e, task.id)}
        />
        {isEditing ? (
          <>
            <input
              className="input-edit"
              type="text"
              value={task.name}
              onChange={(e) => handleEditInputChange(e, task.id)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  updateTask(task.id);
                }
              }}
            />
            <input
              className="input-edit"
              type="text"
              value={task.description}
              onChange={(e) => handleEditDescriptionChange(e, task.id)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  updateTask(task.id);
                }
              }}
            />
          </>
        ) : (
          <>
            <p style={task.completed ? { textDecoration: "line-through" } : {}}>
              {task.name}
            </p>

            <p style={task.completed ? { textDecoration: "line-through" } : {}}>
              {task.description}
            </p>
          </>
        )}

        {/* //Create buttons  */}
        <div>
          {isEditing ? (
            <button onClick={() => updateTask(task.id)}>
              <FontAwesomeIcon icon={faCheck} color="blue" />
            </button>
          ) : (
            <button onClick={() => editTask(task.id)}>
              <FontAwesomeIcon icon={faEdit} color="green" />
            </button>
          )}

          <button onClick={() => deleteTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
}
