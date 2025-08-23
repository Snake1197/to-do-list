
import { Trash2, Edit3 } from "lucide-react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <li className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 cursor-pointer"
        />
        <div className="min-w-0">
          <p
            className={`text-sm sm:text-base break-words whitespace-normal line-clamp-2 ${
              task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.text}
          </p>
          {task.completed && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Completado:{" "}
              {new Date(task.completedAt).toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          title="Editar"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}