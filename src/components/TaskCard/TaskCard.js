"use client";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useDeleteTask } from "@/hooks/useTasks";
import TaskModal from "@/components/TaskModal/TaskModal";


const PRIORITY_PALETTE = {
  HIGH: { bg: "#fdeaea", color: "#d32f2f", border: "#f5c6c6" },
  MEDIUM: { bg: "#fff3e0", color: "#e65100", border: "#ffe0b2" },
  LOW: { bg: "#e3f2fd", color: "#1565c0", border: "#bbdefb" },
};

export default function TaskCard({ task, onDragStart, dragging }) {
  const deleteTask = useDeleteTask();
  const [editOpen, setEditOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const palette = PRIORITY_PALETTE[task.priority] ?? PRIORITY_PALETTE.LOW;

  return (
    <>
      <Card
        elevation={0}
        draggable
        onDragStart={() => onDragStart(task)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          borderRadius: "12px",
          border: "1px solid #eee",
          mb: 1.5,
          opacity: dragging ? 0.45 : 1,
          cursor: "grab",
          position: "relative",
          transition: "box-shadow 0.2s, transform 0.15s",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(0,0,0,0.09)",
            transform: "translateY(-1px)",
          },
          "&:active": { cursor: "grabbing" },
        }}
      >
        {/* Edit and delete buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s",
          }}
        >
          <IconButton
            size="small"
            onClick={() => setEditOpen(true)}
            title="Edit"
            sx={{
              fontSize: 13,
              p: "3px",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            ✏️
          </IconButton>
          <IconButton
            size="small"
            title="Delete"
            disabled={deleteTask.isPending}
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete "${task.title}"?`))
                deleteTask.mutate(task.id);
            }}
            sx={{
              fontSize: 13,
              p: "3px",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#fde8e8" },
            }}
          >
            🗑️
          </IconButton>
        </Box>

        <CardContent sx={{ p: "14px !important", pr: "52px !important" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#1a1a2e",
              mb: 0.5,
              lineHeight: 1.4,
            }}
          >
            {task.title}
          </Typography>
          {task.description && (
            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "#888",
                mb: 1.5,
                lineHeight: 1.5,
              }}
            >
              {task.description}
            </Typography>
          )}
          <Chip
            label={task.priority}
            size="small"
            sx={{
              backgroundColor: palette.bg,
              color: palette.color,
              border: `1px solid ${palette.border}`,
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 22,
              borderRadius: "6px",
              letterSpacing: "0.04em",
            }}
          />
        </CardContent>
      </Card>

      <TaskModal
        key={`edit-${task.id}-${editOpen}`}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={task}
      />
    </>
  );
}
