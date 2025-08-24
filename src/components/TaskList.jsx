/*import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <p className="text-sm text-gray-500 text-center">
        No hay tareas aún. ¡Agrega la primera! ✨
      </p>
    );
  }

  return (
    <ul className="grid gap-3 max-w-full overflow-hidden">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onEdit={() => onEdit(t)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
    </ul>
  );
}
*/
import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onEdit, onDelete, onView }) {
  if (!tasks.length) {
    return (
      <p className="text-sm text-gray-500 text-center">
        No hay tareas aún. ¡Agrega la primera! ✨
      </p>
    );
  }

  return (
    <ul className="grid gap-3 max-w-full overflow-hidden">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onEdit={() => onEdit(t)}
          onDelete={() => onDelete(t.id)}
          onView={() => onView(t)}   {/* 👈 nuevo handler */}
        />
      ))}
    </ul>
  );
}