import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={onEdit}
          sx={{ mt: 2, mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onDelete}
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;