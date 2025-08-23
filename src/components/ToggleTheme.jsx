/*export default function ToggleTheme({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      <span className="ml-3 text-sm">{checked ? "🌙" : "☀️"}</span>
    </label>
  );
}*/
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className="p-2 rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md hover:scale-105 transition"
      aria-label="Alternar tema"
    >
      {checked ? (
        <Moon className="w-5 h-5 text-yellow-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
}