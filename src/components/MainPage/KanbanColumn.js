"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import TaskModal from "@/components/TaskModal/TaskModal";

const PAGE_SIZE = 5;

const COLUMN_META = {
  todo: { label: "TO DO", color: "#6c63ff" },
  inprogress: { label: "IN PROGRESS", color: "#ff9800" },
  inreview: { label: "IN REVIEW", color: "#9c27b0" },
  done: { label: "DONE", color: "#4caf50" },
};

const matchesSearch = (task, query) => {
  const q = query.toLowerCase();
  return (
    task.title?.toLowerCase().includes(q) ||
    task.description?.toLowerCase().includes(q)
  );
};

// Plus icon for add button
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export default function KanbanColumn({
  columnKey,
  tasks,
  search,
  draggedTask,
  onDragStart,
  onDrop,
}) {
  const meta = COLUMN_META[columnKey];
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const visible_tasks = search
    ? tasks.filter((t) => matchesSearch(t, search))
    : tasks;
  const paginated = visible_tasks.slice(0, page * PAGE_SIZE);
  const remaining = visible_tasks.length - paginated.length;

  return (
    <>
      <Box
        sx={{
          flex: "1 1 0",
          minWidth: { xs: 280, sm: 300 },
          maxWidth: { xs: 320, sm: 320 },
          backgroundColor: "#fff",
          borderRadius: 3,
          p: { xs: 1.5, sm: 2 },
          boxShadow: isDragOver
            ? "0 0 0 2px #6c63ff, 0 4px 16px rgba(108,99,255,0.15)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.2s",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={() => {
          setIsDragOver(false);
          onDrop(columnKey);
        }}
      >
        {/* Column header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {/* Column color dot */}
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: meta.color,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              color: "#555",
              textTransform: "uppercase",
              flex: 1,
            }}
          >
            {meta.label}
          </Typography>
          {/* Task count */}
          <Box
            sx={{
              backgroundColor: "#eee",
              borderRadius: "6px",
              px: 1,
              py: 0.2,
            }}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: "0.68rem", color: "#888" }}
            >
              {visible_tasks.length}
            </Typography>
          </Box>
        </Box>

        {/* Task list */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {paginated.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              dragging={draggedTask?.id === task.id}
              onDragStart={onDragStart}
            />
          ))}
        </Box>

        {remaining > 0 && (
          <Button
            size="small"
            onClick={() => setPage((p) => p + 1)}
            sx={{
              mt: 1,
              fontSize: "0.78rem",
              color: "#777",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { color: "#6c63ff", backgroundColor: "#ede9ff" },
            }}
          >
            Load more ({remaining} remaining)
          </Button>
        )}

        {/* Add button */}
        <Button
          onClick={() => setAddOpen(true)}
          startIcon={<PlusIcon />}
          sx={{
            mt: 1,
            color: "#aaa",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.82rem",
            justifyContent: "flex-start",
            px: 1.5,
            py: 1,
            borderRadius: "10px",
            border: "1px dashed #ddd",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#666",
              borderColor: "#bbb",
            },
          }}
        >
          Add task
        </Button>
      </Box>

      <TaskModal
        key={`add-${columnKey}-${addOpen}`}
        open={addOpen}
        onClose={() => setAddOpen(false)}
        defaultColumn={columnKey}
      />
    </>
  );
}
