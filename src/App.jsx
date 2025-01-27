import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Box, Button, Container } from "@mui/material";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import TaskModel from "./components/TaskModel";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [boardData, setBoardData] = useState({
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    tasks: {},
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleTaskSave = (task) => {
    setBoardData((prevData) => {
      const taskId = task.id || `task-${Date.now()}`;
      const isNewTask = !task.id;

      const updatedTasks = {
        ...prevData.tasks,
        [taskId]: { ...task, id: taskId },
      };

      const updatedColumns = { ...prevData.columns };

      // If it's a new task, add it to the selected column
      if (isNewTask) {
        updatedColumns[task.columnId].taskIds = [
          ...updatedColumns[task.columnId].taskIds,
          taskId,
        ];
      } else {
        // If it's an existing task, move it to the specified column
        const oldColumnId = Object.keys(prevData.columns).find((columnId) =>
          prevData.columns[columnId].taskIds.includes(taskId)
        );

        if (oldColumnId && oldColumnId !== task.columnId) {
          updatedColumns[oldColumnId].taskIds = updatedColumns[oldColumnId].taskIds.filter(
            (id) => id !== taskId
          );
          updatedColumns[task.columnId].taskIds = [
            ...updatedColumns[task.columnId].taskIds,
            taskId,
          ];
        }
      }

      return {
        ...prevData,
        tasks: updatedTasks,
        columns: updatedColumns,
      };
    });

    setModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleTaskDelete = (taskId, columnId) => {
    setBoardData((prevData) => {
      const updatedTasks = { ...prevData.tasks };
      delete updatedTasks[taskId];

      const updatedColumns = {
        ...prevData.columns,
        [columnId]: {
          ...prevData.columns[columnId],
          taskIds: prevData.columns[columnId].taskIds.filter(
            (id) => id !== taskId
          ),
        },
      };

      return { ...prevData, tasks: updatedTasks, columns: updatedColumns };
    });
  };

  const handleColumnCreate = () => {
    const newColumnId = `column-${Date.now()}`;
    const newColumnTitle = prompt("Enter column name", "New Column");
    if (!newColumnTitle) return;

    setBoardData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [newColumnId]: { id: newColumnId, title: newColumnTitle, taskIds: [] },
      },
      columnOrder: [...prevData.columnOrder, newColumnId],
    }));
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Main Content */}
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleColumnCreate}
            sx={{ mb: 4 }}
          >
            Add Column
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: -4, ml: 1 }}
            onClick={() => {
              setEditingTask(null);
              setModalOpen(true);
            }}
          >
            Add Task
          </Button>

          <KanbanBoard
            boardData={boardData}
            setBoardData={setBoardData}
            searchTerm={searchTerm}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
          />
        </Container>

        {/* Footer */}
        <Footer columns={boardData.columns} />

        {/* Task Modal */}
        <TaskModel
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleTaskSave}
          task={editingTask}
          columns={boardData.columns} // Pass columns data to TaskModel
        />
      </Box>
    </ThemeProvider>
  );
}

export default App