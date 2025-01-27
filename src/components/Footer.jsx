import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

const Footer = ({ columns = {} }) => {
  const taskSummary = Object.values(columns).map((col) => ({
    title: col.title,
    count: col.taskIds.length,
  }));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.200",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "text.primary" }}
      >
        Task Summary
      </Typography>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 1,
          padding: 0,
        }}
      >
        {taskSummary.map((summary) => (
          <ListItem
            key={summary.title}
            sx={{
              padding: 0,
              fontSize: "0.875rem",
              color: "text.secondary",
              listStyleType: "none",
            }}
          >
            {summary.title}: {summary.count} tasks
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Footer