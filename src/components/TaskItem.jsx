import { useTasks } from "./useTasks";

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <li className="flex items-center justify-between p-3 border-b dark:border-gray-700">
      <label className="flex items-center gap-2 cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span
          className={`${
            task.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {task.text}
        </span>
      </label>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-3 text-red-500 hover:text-red-700 transition-colors"
      >
        ✕
      </button>
    </li>
  );
}