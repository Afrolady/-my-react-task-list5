import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import useTask from './useTask';

export default function Task({
  initialTask,
  deleteTask,
  editTask,
  updateTask,
  idEdit,
  handleEditInputChange,
  handleEditDescriptionChange,
  handleEditInputCheckbox,
}) {
  const { task, setName, setDescription, toggleCompletion } = useTask(initialTask);
  const isEditing = idEdit === task.id;

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleEditInputChange(e, task.id);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    handleEditDescriptionChange(e, task.id);
  };

  return (
    <div>
      <div className="task">
        <input
          type="checkbox"
          checked={task?.completed ? true : false}
          onChange={(e) => handleEditInputCheckbox(e, task.id)}
        />
        {isEditing ? (
          <form>
            <input
              className="input-edit"
              type="text"
              value={task.name}
              onChange={handleNameChange}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  updateTask(task.id);
                }
              }}
            />
            <input
              className="input-edit"
              type="text"
              value={task.description}
              onChange={handleDescriptionChange}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  updateTask(task.id);
                }
              }}
            />
          </form>
        ) : (
          <>
            <p style={task.completed ? { textDecoration: 'line-through' } : {}}>
              {task.name}
            </p>

            <p style={task.completed ? { textDecoration: 'line-through' } : {}}>
              {task.description}
            </p>
          </>
        )}

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