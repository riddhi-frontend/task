import React from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

const Header = ({ searchTerm, setSearchTerm, toggleDarkMode }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        boxShadow: 1,
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Kanban Board
        </Typography>

        {/* Search and Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Input */}
          <TextField
            value={searchTerm}
            onChange={(e) => {
              console.log("Search Term:", e.target.value); // Debug log
              setSearchTerm(e.target.value);
            }}
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "white",
              "& .MuiOutlinedInput-root": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />

          {/* Dark Mode Toggle */}
          <Button
            variant="contained"
            onClick={toggleDarkMode}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "black",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.700" : "grey.400",
              },
            }}
          >
            Change Theme
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header