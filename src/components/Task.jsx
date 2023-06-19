import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Task({ task, deleteTask, editTask, idEdit }) {
  return (
    <div>
      <div className="task">
        <input type="checkbox" />
        {idEdit == task.id ? (
          <p>{task.name}</p>
        ) : (
          <input className="input-edit" type="text" />
        )}
        <div>
          <button
            onClick={() => {
              editTask(task.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} color="green" />
          </button>

          <button
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
}
