
import { Trash2, Edit3 } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const safeTitle = task.title || "";
  const safeDesc = task.description || "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-2 overflow-hidden"
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 w-5 h-5 cursor-pointer accent-blue-500"
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold line-clamp-2 break-words whitespace-normal ${
              task.completed ? "line-through opacity-60" : ""
            }`}
            title={safeTitle}
          >
            {safeTitle}
          </h3>
          <p
            className={`text-sm text-gray-600 dark:text-gray-300 line-clamp-4 break-words whitespace-normal ${
              task.completed ? "line-through opacity-60" : ""
            }`}
            title={safeDesc}
          >
            {safeDesc}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Editar"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-700/40"
          title="Eliminar"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </motion.div>
  );
}