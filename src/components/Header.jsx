/*import ToggleTheme from "./ToggleTheme.jsx";

export default function Header({ pendingCount, total, darkMode, toggleTheme }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {pendingCount} pendiente(s) de {total} tarea(s).
        </p>
      </div>
      <ToggleTheme checked={darkMode} onChange={toggleTheme} />
    </header>
  );
}*/
import ToggleTheme from "./ToggleTheme.jsx";

export default function Header({ pendingCount, total, darkMode, toggleTheme }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {pendingCount} pendiente(s) de {total} tarea(s).
        </p>
      </div>
      <ToggleTheme checked={darkMode} onChange={toggleTheme} />
    </header>
  );
}