import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TASKS_ENDPOINT = "/api/tasks";

const json = (res) => {
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const invalidateTasks = (qc) => qc.invalidateQueries({ queryKey: ["tasks"] });

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch(TASKS_ENDPOINT).then(json),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      fetch(TASKS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(json),
    onSuccess: () => invalidateTasks(qc),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...patch }) =>
      fetch(`${TASKS_ENDPOINT}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }).then(json),
    onSuccess: () => invalidateTasks(qc),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetch(`${TASKS_ENDPOINT}/${id}`, { method: "DELETE" }).then(json),
    onSuccess: () => invalidateTasks(qc),
  });
}
