"use client";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";

const PRIORITIES = ["HIGH", "MEDIUM", "LOW"];
const COLUMN_OPTIONS = [
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "inreview", label: "In Review" },
  { key: "done", label: "Done" },
];

const fieldChange = (setter, field) => (e) =>
  setter((f) => ({ ...f, [field]: e.target.value }));

export default function TaskModal({ open, onClose, task, defaultColumn }) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isEdit = Boolean(task);

  const [draft, setDraft] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "MEDIUM",
    column: task?.column || defaultColumn || "todo",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!draft.title.trim()) return;
    await (isEdit
      ? updateTask.mutateAsync({ id: task.id, ...draft })
      : createTask.mutateAsync(draft));
    onClose();
  }

  const saving = createTask.isPending || updateTask.isPending;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a1a2e", pb: 1 }}
      >
        {isEdit ? "Edit Task" : "New Task"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          <TextField
            label="Title"
            required
            autoFocus
            size="small"
            fullWidth
            value={draft.title}
            onChange={fieldChange(setDraft, "title")}
          />
          <TextField
            label="Description"
            size="small"
            fullWidth
            multiline
            rows={3}
            value={draft.description}
            onChange={fieldChange(setDraft, "description")}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                value={draft.priority}
                onChange={fieldChange(setDraft, "priority")}
              >
                {PRIORITIES.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Column</InputLabel>
              <Select
                label="Column"
                value={draft.column}
                onChange={fieldChange(setDraft, "column")}
              >
                {COLUMN_OPTIONS.map(({ key, label }) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={saving}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !draft.title.trim()}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#6c63ff",
              "&:hover": { backgroundColor: "#5a52e0" },
            }}
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
