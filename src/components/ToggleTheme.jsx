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