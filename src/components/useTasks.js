import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const pendingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  const addTask = (task) => {
    setTasks((prev) =>
      [task, ...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );
  };

  const updateTask = (updated) => {
    setTasks((prev) =>
      prev
        .map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    pendingCount,
  };
}