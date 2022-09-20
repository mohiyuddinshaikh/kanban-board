import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import "../assets/styles/taskManager.scss";
import { userTasks } from "../data/tasks";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";
import AddTaskForm from "./AddTask";
import { Draggable } from "react-beautiful-dnd";

export default function TaskContainer(props) {
  const dispatch = useDispatch();

  const { stage, droppableProps, refProp, droppableProvided } = props;

  const { tasks } = useSelector((state) => state.tasks);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div className="task__container" {...droppableProps} ref={refProp}>
        <div className="title">{stage?.name}</div>
        {tasks && tasks?.length ? (
          tasks
            .filter((filteredTask) => filteredTask.stage === stage.stage)
            .map((task, index) => {
              return (
                <Draggable
                  key={task.name}
                  draggableId={task.name}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <Task
                        index={index}
                        task={task}
                        taskRefProp={provided.innerRef}
                        taskDraggableProp={provided.draggableProps}
                        taskDragHandleProp={provided.dragHandleProps}
                      />
                    );
                  }}
                </Draggable>
              );
            })
        ) : (
          <div className="no--tasks">No Tasks Yet ...</div>
        )}
        {droppableProvided.placeholder}
      </div>
    </Grid>
  );
}
