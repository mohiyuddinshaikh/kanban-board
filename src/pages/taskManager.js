import React, { useEffect, useState } from "react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import "../assets/styles/taskManager.scss";
import { totalStages } from "../assets/constants/constants";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import TaskContainer from "../components/TaskContainer";
import AddTaskForm from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TaskManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

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

  return (
    <div>
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
            return <TaskContainer key={index} stage={stage} />;
          })}
        </Grid>
      </div>
      <AddTaskForm
        open={addTask}
        closeForm={closeAddTask}
        openForm={handleAddTask}
      />
    </div>
  );
}
