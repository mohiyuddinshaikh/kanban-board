import React from "react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import "../assets/styles/taskManager.scss";
import { totalStages } from "../assets/constants/constants";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TaskContainer from "../components/TaskContainer";

export default function TaskManager() {
  return (
    <div>
      <ResponsiveHeader />
      <Grid
        container
        className="tasks__container"
        spacing={5}
        justifyContent="center"
      >
        {totalStages.map((stage) => {
          return <TaskContainer stage={stage} />;
        })}
      </Grid>
    </div>
  );
}
