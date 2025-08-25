import ToggleTheme from "./ToggleTheme.jsx";

export default function Header({ pendingCount, total, darkMode, toggleTheme }) {
  return (
    <header
      className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0"
      role="banner"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          To-Do List
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {pendingCount} pendiente(s) de {total} tarea(s).
        </p>
      </div>

      <ToggleTheme checked={darkMode} onChange={toggleTheme} />
    </header>
  );
}
