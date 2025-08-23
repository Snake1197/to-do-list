import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 👇 Estado de tema
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Persistir tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persistir tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const pendingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  const addTask = (task) => {
    setTasks((prev) =>
      [task, ...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );
    setShowForm(false);
  };

  const updateTask = (updated) => {
    setTasks((prev) =>
      prev
        .map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );
    setEditing(null);
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const startEdit = (task) => {
    setEditing(task);
    setShowForm(true);
  };
  const cancelEdit = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pendingCount} pendiente(s) de {tasks.length} tarea(s).
          </p>
        </div>

        {/* 🌙☀️ Switch de modo oscuro */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
          <span className="ml-3 text-sm">{darkMode ? "🌙" : "☀️"}</span>
        </label>
      </header>

      {/* Botón para abrir modal */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-xl px-4 py-2 font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow cursor-pointer"
        >
          Agregar tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <section>
        <TaskList
          tasks={tasks}
          onToggle={toggleComplete}
          onEdit={startEdit}
          onDelete={deleteTask}
        />
      </section>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            {/* 🔹 Header del modal */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editing ? "Editar tarea" : "Nueva tarea"}
              </h2>
              {/* Botón cerrar */}
              <button
                onClick={cancelEdit}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                title="Cerrar"
              >
                ❌
              </button>
            </div>

            {/* 🔹 Contenido del formulario */}
            <TaskForm
              key={editing?.id || "new"}
              initialTask={editing}
              onCreate={addTask}
              onUpdate={updateTask}
              onCancel={cancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
