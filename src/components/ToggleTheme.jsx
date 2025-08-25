import { Sun, Moon } from "lucide-react";

export default function ToggleTheme({ checked, onChange }) {
  const Icon = checked ? Moon : Sun;
  const iconColor = checked ? "text-yellow-400" : "text-yellow-500";
  const label = checked ? "Modo oscuro" : "Modo claro";

  return (
    <button
      onClick={onChange}
      className="p-2 rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-200 ease-in-out "
      aria-label={`Alternar tema: ${label}`}
      title={label}
    >
      <Icon className={`w-5 h-5 ${iconColor} transition-colors duration-200`} />
    </button>
  );
}
