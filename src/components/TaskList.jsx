import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function TaskList() {
  const [name, setName] = useState(""); //Indica el estado inicial con el que quiero inicializar el estado
  const [tasks, setTasks] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const changeName = (e) => {
    setName(e.target.value); //obtiene el input que escribe el usuario y lo actualiza
  };

  //UseEffect analiza una variable. cuando me quiero dar cuenta si el state cambia. se inicia por default
  useEffect(() => {
    const tasksLocalStorage = getTasks();
    setTasks(tasksLocalStorage);
  }, []);

  const createTask = () => {
    const id = math;
    const newTask = { name, id };
    if (name.length === 0) {
      alert("The task cannot be empty");
    } else {
      saveTask(newTask);
    }
  };

  function saveTask(task) {
    let newArray = tasks;
    newArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(newArray));
    setName(""); // set name reinicia el input.  cuando se agreaga la tarea el cuafro queda vacio
    setTasks(newArray);
  }

  function getTasks() {
    const tasksLocalStorage = localStorage.getItem("tasks");
    return JSON.parse(tasksLocalStorage) || []; //cuando busque las tareas de localstorage y no existe devuelve un arreglo vacio
  }

  const deleteTask = (id) => {
    const newArray = tasks.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newArray));
    setTasks(newArray);
  };

  const editTask = (id) => {
    const task = tasks.filter((item) => item.id === id)[0];
    setIdEdit(task.id);
  };

  return (
    <>
      <div className="container-add">
        <input type="text" value={name} onInput={changeName} />{" "}
        {/*/onInput cambia el valor del name cuando el usuario escribe algo en el input */}
        <button onClick={createTask}> + </button>
      </div>

      <div className="container-tasks">
        {tasks?.map((task, index) => {
          return (
            <Task
              task={task}
              key={index}
              deleteTask={deleteTask}
              editTask={editTask}
              idEdit={idEdit}
            />
          );
        })}
      </div>
    </>
  );
}
