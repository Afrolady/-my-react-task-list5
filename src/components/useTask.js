import { useState } from 'react';

function useTask(initialTask) {
  const [task, setTask] = useState(initialTask);

  function setName(name) {
    setTask(prevTask => ({ ...prevTask, name }));
  }

  function setDescription(description) {
    setTask(prevTask => ({ ...prevTask, description }));
  }

  function toggleCompletion() {
    setTask(prevTask => ({ ...prevTask, completed: !prevTask.completed }));
  }

  return {
    task,
    setName,
    setDescription,
    toggleCompletion
  };
}

export default useTask;