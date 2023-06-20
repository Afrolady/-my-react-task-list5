import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function TaskList() {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [idEdit, setIdEdit] = useState(null);

  useEffect(() => {
    const tasksLocalStorage = getTasks();
    setTasks(tasksLocalStorage);
  }, []);

  const changeName = (e) => {
    setName(e.target.value);
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
      completed: false,
    };

    if (name.trim() === "") {
      alert("The task name cannot be empty");
    } else {
      saveTask(newTask);
      setName("");
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
        <input
          type="text"
          value={name}
          onChange={changeName}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              createTask();
            }
          }}
        />
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
          />
        ))}
      </div>
    </>
  );
}
