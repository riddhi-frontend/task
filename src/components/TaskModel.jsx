import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskModel = ({ isOpen, onClose, onSave, task, columns }) => {
  const [taskData, setTaskData] = useState(
    task || { title: "", description: "", priority: "Low", date: "", columnId: "column-1" }
  );

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (taskData.title.trim() !== "" && taskData.date !== "") {
      onSave(taskData); // Pass task data to the parent (App) to be saved
      setTaskData({ title: "", description: "", priority: "Low", date: "", columnId: "column-1" }); // Reset form
    } else {
      alert("Task title and date are required!");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Priority"
          name="priority"
          value={taskData.priority}
          onChange={handleInputChange}
          select
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={taskData.date}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        
        {/* Column Selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Column</InputLabel>
          <Select
            value={taskData.columnId}
            name="columnId"
            onChange={handleInputChange}
            label="Column"
          >
            {Object.keys(columns).map((columnId) => (
              <MenuItem key={columnId} value={columnId}>
                {columns[columnId].title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{task ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModel;
