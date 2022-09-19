import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { priorities, totalStages } from "../assets/constants/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import moment from "moment";
import "../assets/styles/createTask.scss";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const FIRST_STAGE = totalStages[0].stage;

export default function AddTaskForm(props) {
  const dispatch = useDispatch();

  const { open, closeForm, openForm, task, edit } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const [name, setName] = useState(task?.name || null);
  const [stage, setStage] = useState(task?.stage || FIRST_STAGE);
  const [priority, setPriority] = useState(task?.priority || null);
  const [deadline, setDeadline] = useState(task?.deadline || null);

  const handleDeadline = (date) => {
    setDeadline(date.format());
  };

  const handleSubmit = () => {
    const payload = {
      name,
      stage,
      priority,
      deadline,
    };
    if (edit) {
      let tempTasks = [...tasks];
      const updatedTasks = tempTasks.map((element) => {
        if (element.name === task.name) {
          return payload;
        } else return element;
      });
      dispatch(taskActions.editTask(updatedTasks));
    } else {
      dispatch(taskActions.addTask(payload));
    }
    closeForm();
  };

  return (
    <Dialog open={open} onClose={closeForm} maxWidth="sm" fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <div onSubmit={handleSubmit} className="create--task__form">
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            size="small"
            className="form--input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form--input">
            <FormControl fullWidth>
              <TextField
                select
                id="stage"
                value={stage}
                label="Stage"
                required
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              >
                {totalStages.map((stage, index) => (
                  <MenuItem key={index} value={stage?.stage}>
                    {stage?.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="form--input">
            <FormControl fullWidth>
              <TextField
                select
                id="priority"
                value={priority}
                label="Priority"
                required
                size="small"
                onChange={(e) => setPriority(e.target.value)}
              >
                {priorities.map((item, index) => (
                  <MenuItem key={index} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="form--input">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Deadline"
                value={deadline}
                onChange={(date) => {
                  handleDeadline(date);
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="form--input">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleSubmit}
            >
              {edit ? "Edit Task" : "Create Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
