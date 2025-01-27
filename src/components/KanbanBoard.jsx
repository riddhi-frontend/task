import React, { useState } from "react"
import { Box, Grid, Typography, Paper, Button, TextField } from "@mui/material"
import TaskCard from "./TaskCard"

const KanbanBoard = ({ boardData, searchTerm, onTaskEdit, onTaskDelete, onColumnDelete, onColumnRename }) => {
  const [editingColumn, setEditingColumn] = useState(null)
  const [newColumnName, setNewColumnName] = useState("")

  const safeToLower = (str) => (str ? str.toLowerCase() : "")

  // Filter tasks based on the searchTerm
  const filteredColumns = boardData.columnOrder.map((columnId) => {
    const column = boardData.columns[columnId]
    const tasks = column.taskIds
      .map((taskId) => boardData.tasks[taskId])
      .filter((task) => task && task.title && safeToLower(task.title).includes(safeToLower(searchTerm)))

    return {
      ...column,
      tasks,
    }
  })

  const handleColumnRename = (columnId) => {
    if (!newColumnName.trim()) {
      alert("Column name cannot be empty!")
      return
    }
    onColumnRename(columnId, newColumnName)
    setEditingColumn(null)
    setNewColumnName("")
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {filteredColumns.map((column) => (
          <Grid item xs={12} sm={6} md={4} key={column.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                {editingColumn === column.id ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleColumnRename(column.id)}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <>
                    {column.title}
                    <Button
                      variant="text"
                      color="secondary"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        setEditingColumn(column.id)
                        setNewColumnName(column.title)
                      }}
                    >
                      Rename
                    </Button>
                    <Button
                      variant="text"
                      color="secondary"
                      sx={{ ml: 1 }}
                      onClick={() => onColumnDelete(column.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Typography>
              <Box
                sx={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => onTaskEdit(task)}
                    onDelete={() => onTaskDelete(task.id, column.id)}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default KanbanBoard