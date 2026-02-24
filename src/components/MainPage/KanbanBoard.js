"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTasks, useUpdateTask } from "@/hooks/useTasks";
import { useSearch } from "@/context/SearchContext";
import KanbanColumn from "./KanbanColumn";

const COLUMN_KEYS = ["todo", "inprogress", "inreview", "done"];

// Group tasks by column
function groupByColumn(tasks) {
  return tasks.reduce((acc, task) => {
    (acc[task.column] ??= []).push(task);
    return acc;
  }, {});
}

export default function KanbanBoard() {
  const { data: tasks, isLoading, isError } = useTasks();
  const updateTask = useUpdateTask();
  const { search } = useSearch();
  const [draggedTask, setDraggedTask] = useState(null);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#6c63ff" }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography color="error" fontSize="0.9rem">
          Failed to load tasks. Make sure json-server is running on port 4000.
        </Typography>
      </Box>
    );
  }

  // Group tasks by column
  const byColumn = groupByColumn(tasks);

  function handleDrop(targetColumn) {
    if (!draggedTask || draggedTask.column === targetColumn) {
      setDraggedTask(null);
      return;
    }
    updateTask.mutate({ id: draggedTask.id, column: targetColumn });
    setDraggedTask(null);
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1.5, sm: 2.5 },
        p: { xs: 1.5, sm: 3 },
        overflowX: "auto",
        minHeight: "calc(100vh - 52px)",
        alignItems: "flex-start",
        // Smooth scrolling for mobile touch
        WebkitOverflowScrolling: "touch",
      }}
    >
      {COLUMN_KEYS.map((col) => (
        <KanbanColumn
          key={col}
          columnKey={col}
          tasks={byColumn[col] ?? []}
          search={search}
          draggedTask={draggedTask}
          onDragStart={setDraggedTask}
          onDrop={handleDrop}
        />
      ))}
    </Box>
  );
}
