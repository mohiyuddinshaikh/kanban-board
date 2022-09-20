import React, { useState } from "react";
import "../assets/styles/taskManager.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { totalStages } from "../assets/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";
import AddTaskForm from "./AddTask";

export default function Task(props) {
  const dispatch = useDispatch();

  const { task, index } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const [addTask, setAddTask] = useState(false);

  const handleAddTask = () => {
    setAddTask(true);
  };

  const closeAddTask = () => {
    setAddTask(false);
  };

  const handleMove = (type) => {
    let updatedTasks = [];
    tasks.forEach((element) => {
      if (element.name === task.name) {
        updatedTasks.push({
          ...element,
          stage: type === 0 ? element.stage - 1 : element.stage + 1,
        });
      } else {
        updatedTasks.push(element);
      }
    });
    dispatch(taskActions.editTask(updatedTasks));
  };

  const handleDeleteTask = () => {
    dispatch(taskActions.deleteTask(task));
  };

  return (
    <div className="task__primary" key={task?.name}>
      <div className="title">{task.name}</div>
      <div className="icon__container">
        <IconButton
          color="inherit"
          edge="start"
          disabled={task?.stage === 0}
          onClick={() => handleMove(0)}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          color="inherit"
          edge="start"
          disabled={task?.stage === totalStages.length - 1}
          onClick={() => handleMove(1)}
        >
          <ArrowForwardIcon />
        </IconButton>
        <IconButton color="inherit" edge="start" onClick={handleAddTask}>
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" edge="start" onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
        <AddTaskForm
          open={addTask}
          closeForm={closeAddTask}
          openForm={handleAddTask}
          task={task}
          edit
        />
      </div>
    </div>
  );
}
