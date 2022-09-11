// src/App.js
import React, { useRef, useState } from "react";
import {
  BryntumTaskBoard,
  BryntumProjectModel,
} from "@bryntum/taskboard-react";
import { taskBoardConfig } from "./AppConfig";
import { projectData } from "./AppData";
import "./App.css";

function App() {
  const taskBoard = useRef();
  const project = useRef();
  const [tasks, setTasks] = useState(projectData.tasks);
  const [assignments] = useState(projectData.assignments);
  const [resources] = useState(projectData.users);
  function onChange(change) {
    if(change.action === 'add') {
      setTasks(() => [...tasks, change.records[0].data])
    }
    if(change.action === 'update') {
      const updatedTask =  change.record.data
      const newTasks = [...tasks].filter(item => item.id !== updatedTask.id)
      setTasks(() => [...newTasks, updatedTask])
    }
  }

  return (
    <>
      <BryntumProjectModel
        ref={project}
        tasks={tasks}
        assignments={assignments}
        resources={resources}
        onChange={onChange}
      />
      <nav className={"header"}>
        <h1 className={"heading"}>Trello using Bryntum TaskBoard</h1>
        <button
          className={"add-column"}
          onClick={() => {
            const value = prompt("Column name");
            if (value) {
              taskBoard.current.instance.columns.add({
                id: value,
                text: value,
              });
            }
          }}
        >
          Add column
        </button>
      </nav>
      <BryntumTaskBoard
        ref={taskBoard}
        project={project}
        columnDragFeature
        taskTooltipFeature
        {...taskBoardConfig}
      />
    </>
  );
}

export default App;