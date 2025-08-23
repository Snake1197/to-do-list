import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { Moon, Sun, Plus } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔹 filtros y orden
  const [filter, setFilter] = useState("pending"); // 👉 por defecto pendientes
  const [sortOption, setSortOption] = useState("created_desc");

  // 🔹 tema
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // persistir tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // persistir tema
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
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
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

  // 🔹 aplicar filtro
  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // 🔹 aplicar orden según opción seleccionada
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case "alpha_asc":
        return a.title.localeCompare(b.title);
      case "alpha_desc":
        return b.title.localeCompare(a.title);
      case "created_asc":
        return a.createdAt.localeCompare(b.createdAt);
      case "created_desc":
        return b.createdAt.localeCompare(a.createdAt);
      case "completed_asc":
        if (!a.completedAt) return 1;
        if (!b.completedAt) return -1;
        return a.completedAt.localeCompare(b.completedAt);
      case "completed_desc":
        if (!a.completedAt) return 1;
        if (!b.completedAt) return -1;
        return b.completedAt.localeCompare(a.completedAt);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="mb-6 flex items-center justify-between">
        {/* Título + dark mode */}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Alternar tema"
          >
            {darkMode ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Controles: contador + botón nueva (solo desktop) */}
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700">
            {pendingCount} pendiente(s) / {tasks.length}
          </span>
          <button
            onClick={() => setShowForm(true)}
            className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 font-medium bg-green-600 text-white shadow hover:bg-green-700"
          >
            <Plus className="w-5 h-5" /> Nueva
          </button>
        </div>
      </header>

      {/* Controles de filtros + orden */}
      <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        {/* Filtros */}
        <div className="flex gap-2">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full border transition ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {f === "all" && "Todas"}
              {f === "pending" && "Pendientes"}
              {f === "completed" && "Completadas"}
            </button>
          ))}
        </div>

        {/* Orden único */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="ml-auto rounded-lg border px-2 py-1 bg-white dark:bg-gray-800 cursor-pointer"
        >
          <option value="created_desc">📅 Creación (Nuevas primero)</option>
          <option value="created_asc">📅 Creación (Antiguas primero)</option>
          <option value="alpha_asc">🔤 Alfabético (A → Z)</option>
          <option value="alpha_desc">🔤 Alfabético (Z → A)</option>
          <option value="completed_desc">✅ Completadas (Más recientes)</option>
          <option value="completed_asc">✅ Completadas (Más antiguas)</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <section>
        {sortedTasks.length > 0 ? (
          <TaskList
            tasks={sortedTasks}
            onToggle={toggleComplete}
            onEdit={startEdit}
            onDelete={deleteTask}
          />
        ) : (
          <p className="text-center text-gray-500 mt-10">
            📋 No hay tareas aún. <br /> ¡Agrega la primera! ✨
          </p>
        )}
      </section>

      {/* Botón flotante solo en móvil */}
      <button
        onClick={() => setShowForm(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 cursor-pointer"
        title="Agregar tarea"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editing ? "Editar tarea" : "Nueva tarea"}
              </h2>
              <button
                onClick={cancelEdit}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                title="Cerrar"
              >
                ❌
              </button>
            </div>
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
