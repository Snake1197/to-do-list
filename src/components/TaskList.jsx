import TaskItem from "./TaskItem.jsx";

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onView,
}) {
  if (!tasks.length) {
    return (
      <div role="status" className="text-sm text-gray-500 text-center py-4">
        No hay tareas aún. <span aria-hidden="true">✨</span>
      </div>
    );
  }

  return (
    <ul
      className="grid gap-3 max-w-full overflow-hidden"
      aria-label="Lista de tareas"
    >
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onEdit={() => onEdit(t)}
          onDelete={() => onDelete(t.id)}
          onView={() => onView(t)}
        />
      ))}
    </ul>
  );
}
