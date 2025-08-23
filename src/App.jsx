import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Persistir
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <Layout>
      <Header
        pendingCount={pendingCount}
        total={tasks.length}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />

      <div className="mb-6">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Agregar tarea
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        onToggle={toggleComplete}
        onEdit={startEdit}
        onDelete={deleteTask}
      />

      {showForm && (
        <Modal
          title={editing ? "Editar tarea" : "Nueva tarea"}
          onClose={cancelEdit}
        >
          <TaskForm
            key={editing?.id || "new"}
            initialTask={editing}
            onCreate={addTask}
            onUpdate={updateTask}
            onCancel={cancelEdit}
          />
        </Modal>
      )}
    </Layout>
  );
}