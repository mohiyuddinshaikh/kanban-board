import React, { useEffect, useState } from "react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import "../assets/styles/taskManager.scss";
import { totalStages } from "../assets/constants/constants";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import TaskContainer from "../components/TaskContainer";
import AddTaskForm from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import * as taskActions from "../store/reducers/tasks.slice";

export default function TaskManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);

  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    if (!user?.name) {
      goToHome();
    }
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  const handleAddTask = () => {
    setAddTask(true);
  };

  const closeAddTask = () => {
    setAddTask(false);
  };

  const AddTask = () => {
    return (
      <div>
        <Button onClick={handleAddTask} variant="contained" color="primary">
          Create Task
        </Button>
      </div>
    );
  };

  const getStageIndex = (stageName) => {
    const record = totalStages.filter((item) => item.name === stageName);
    return record[0]?.stage;
  };

  const handleDragEnd = (result) => {
    if (!result) {
      return;
    }

    const { source, destination, draggableId } = result;

    if (!source || !destination || !draggableId) {
      return;
    }

    const updatedTasks = tasks.map((element) => {
      if (element.name === draggableId) {
        return {
          ...element,
          stage: getStageIndex(destination?.droppableId),
        };
      } else return element;
    });

    dispatch(taskActions.editTask(updatedTasks));
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <ResponsiveHeader />
        <div className="task--manager__body">
          <AddTask />
          <Grid
            container
            className="tasks__container"
            spacing={5}
            justifyContent="center"
          >
            {totalStages.map((stage, index) => {
              return (
                <Droppable droppableId={stage.name}>
                  {(provided, snapshot) => {
                    return (
                      <TaskContainer
                        key={index}
                        stage={stage}
                        droppableProps={provided.droppableProps}
                        refProp={provided.innerRef}
                        droppableProvided={provided}
                      />
                    );
                  }}
                </Droppable>
              );
            })}
          </Grid>
        </div>
        <AddTaskForm
          open={addTask}
          closeForm={closeAddTask}
          openForm={handleAddTask}
        />
      </DragDropContext>
    </div>
  );
}
