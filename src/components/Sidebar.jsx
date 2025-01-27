import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TaskModel from "./TaskModel";

const Sidebar = ({ task, onClose, editTask, deleteTask }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleSave = (updatedTask) => {
    editTask(updatedTask);
  };

  return (
    <Box
      sx={{
        width: "300px",
        padding: 2,
        marginLeft: 4,
        backgroundColor: "grey.200",
        height: "60vh",
        position: "relative",
      }}
    >
      {/* Close Button with background color */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#000",
          backgroundColor: "#0002",
          "&:hover": {
            backgroundColor: "#0014", 
          },
        }}
        color="primary"
      >
        <CloseIcon />
      </IconButton>

      {task ? (
        <>
          <Typography variant="h6" mb={2}>
            Task Details
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Title:
          </Typography>
          <Typography variant="body2" mb={2}>
            {task.title}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Description:
          </Typography>
          <Typography variant="body2" mb={2}>
            {task.description || "No description provided"}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Priority:
          </Typography>
          <Typography variant="body2" mb={2}>
            {task.priority}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Due Date:
          </Typography>
          <Typography variant="body2" mb={2}>
            {task.dueDate || "No due date set"}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {/* Edit Button */}
            <Button variant="contained" onClick={handleEditClick}>
              Edit
            </Button>
            {/* Delete Button with background color */}
            <IconButton
              onClick={() => deleteTask(task.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <TaskModel
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            task={task}
          />
        </>
      ) : (
        <Typography variant="body1" mt={2}>
          No task selected.
        </Typography>
      )}
    </Box>
  );
};

export default Sidebar;
