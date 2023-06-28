import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function TaskList() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [idEdit, setIdEdit] = useState(null);

  useEffect(() => {
    const tasksLocalStorage = getTasks();
    setTasks(tasksLocalStorage);
  }, []);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDescription = (e) => {
    setdescription(e.target.value);
  };

  const handleEditInputChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: e.target.value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const handleEditDescriptionChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: e.target.value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleEditInputCheckbox = (e, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: e.target.checked };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    setIdEdit(taskId);
  };

  const updateTask = (taskId) => {
    setIdEdit(null);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const createTask = () => {
    const newTask = {
      id: generateUniqueId(),
      name: name,
      description: description,
      completed: false,
    };

    if (name.trim()?.length < 3) {
      alert("Task title must have at least three characters");
    } else {
      saveTask(newTask);
      setName("");
      setdescription("");
    }
  };

  const saveTask = (task) => {
    const updatedTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const getTasks = () => {
    const tasksLocalStorage = localStorage.getItem("tasks");

    return JSON.parse(tasksLocalStorage) || [];
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 900) + 100;
  };

  return (
    <>
      <div className="container-add">
        <div className="content-inputs">
          <input
            type="text"
            value={name}
            onChange={changeName}
            placeholder="Titulo de la tarea"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                createTask();
              }
            }}
          />
          <input
            type="text"
            value={description}
            onChange={changeDescription}
            placeholder="Descripcion de la tarea"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                createTask();
              }
            }}
          />
        </div>
        <button onClick={createTask}>+</button>
      </div>
      <div className="container-tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={handleEditTask}
            updateTask={updateTask}
            idEdit={idEdit}
            handleEditInputChange={handleEditInputChange}
            handleEditInputCheckbox={handleEditInputCheckbox}
            handleEditDescriptionChange={handleEditDescriptionChange}
          />
        ))}
      </div>
    </>
  );
}
