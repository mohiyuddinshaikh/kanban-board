import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import "../assets/styles/taskManager.scss";
import { userTasks } from "../data/tasks";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";

export default function TaskContainer(props) {
  const dispatch = useDispatch();

  const { stage } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const AddTask = () => {
    return (
      <div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    );
  };

  const handleAddTask = () => {
    dispatch(
      taskActions.addTask({
        stage: 2,
        name: "New task added",
      })
    );
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div className="task__container">
        <div className="title">{stage?.name}</div>
        {tasks &&
          tasks?.length &&
          tasks
            .filter((filteredTask) => filteredTask.stage === stage.stage)
            .map((task) => {
              return <Task task={task} />;
            })}
        <AddTask />
      </div>
    </Grid>
  );
}
