import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { dashboardDataContainers } from "../assets/constants/constants";
import ResponsiveHeader from "../components/ResponsiveHeader";
import { userTasks } from "../data/tasks";
import { users } from "../data/users";
import "../assets/styles/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as taskActions from "../store/reducers/tasks.slice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState(null);

  const viewAll = true;

  useEffect(() => {
    if (user && !tasks?.length) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = () => {
    const filteredUser = userTasks.filter(
      (taskItem) => taskItem.email === user?.email
    );
    if (filteredUser?.length) {
      setTasks(filteredUser[0]?.tasks);
      dispatch(taskActions.addInitial(filteredUser[0]?.tasks));
    }
  };

  const getCardTitle = (title) => {
    switch (title) {
      case "Total":
        return tasks?.length;
        break;
      case "Pending":
        let pending = 0;
        tasks.forEach((task) => {
          if (task.stage !== 3) {
            pending++;
          }
        });
        return pending;
        break;
      case "Completed":
        let completed = 0;
        tasks.forEach((task) => {
          if (task.stage === 3) {
            completed++;
          }
        });
        return completed;
        break;

      default:
        return 0;
        break;
    }
  };

  const goToTaskManager = () => {
    navigate("/tasks");
  };

  return (
    <div
      style={{
        // width: viewAll ? '85%' : '100%',
        // marginLeft: viewAll ? '15%' : 0,
        width: "100%",
      }}
    >
      <ResponsiveHeader />
      <div className="dashboard__container">
        <div className="dashboard__title">Hello, {user?.name || "Guest"} !</div>
        <div className="dashboard__task--header">Tasks</div>
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          justifyContent="center"
        >
          {dashboardDataContainers.map((item, index) => {
            return (
              <Grid item xs={12} sm={5} md={2} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid black",
                    flexDirection: "column",
                    padding: "10px 0",
                  }}
                >
                  <Typography>{item}</Typography>
                  <Divider />
                  <div className="dashboard__card--title">
                    {tasks && getCardTitle(item)}
                  </div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <button onClick={goToTaskManager}>Go to Tasks</button>
      </div>
    </div>
  );
}
