import React from "react";
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

export default function Task(props) {
  const dispatch = useDispatch();

  const { task } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const handleMoveToPreviousStage = () => {
    let tempTask = { ...task };
    tempTask.stage -= 1;
    dispatch(taskActions.editTask(tempTask));
  };

  const handleMoveToNextStage = () => {
    let tempTask = { ...task };
    tempTask.stage += 1;
    dispatch(taskActions.editTask(tempTask));
  };

  const handleDeleteTask = () => {
    dispatch(taskActions.deleteTask(task));
  };

  return (
    <div className="task__primary">
      <div className="title">{task.name}</div>
      <div className="icon__container">
        <IconButton
          color="inherit"
          edge="start"
          disabled={task?.stage === 0}
          onClick={handleMoveToPreviousStage}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          color="inherit"
          edge="start"
          disabled={task?.stage === totalStages.length - 1}
          onClick={handleMoveToNextStage}
        >
          <ArrowForwardIcon />
        </IconButton>
        <IconButton color="inherit" edge="start">
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" edge="start" onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
