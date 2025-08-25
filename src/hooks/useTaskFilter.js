import { useMemo } from "react";

export function useTaskFilter(tasks, filter) {
  return useMemo(() => {
    switch (filter) {
      case "pending":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      case "all":
      default:
        return tasks;
    }
  }, [tasks, filter]);
}
