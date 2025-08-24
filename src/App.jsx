/*import { useState } from "react";
import { useDarkMode } from "./components/useDarkMode";
import { useTasks } from "./components/useTasks";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";

export default function App() {
  const { tasks, addTask, updateTask, toggleComplete, deleteTask, pendingCount } = useTasks();
  const [darkMode, setDarkMode] = useDarkMode();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
            onCreate={(t) => { addTask(t); setShowForm(false); }}
            onUpdate={(t) => { updateTask(t); setShowForm(false); setEditing(null); }}
            onCancel={cancelEdit}
          />
        </Modal>
      )}
    </Layout>
  );
}*/
import { useState } from "react";
import { useDarkMode } from "./components/useDarkMode";
import { useTasks } from "./components/useTasks";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";
import FilterButtons from "./components/FilterButtons.jsx";
import { Plus } from "lucide-react";

export default function App() {
  const { tasks, addTask, updateTask, toggleComplete, deleteTask, pendingCount } = useTasks();
  const [darkMode, setDarkMode] = useDarkMode();
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null); // 👈 para ver detalle
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("pending");

  const startEdit = (task) => {
    setEditing(task);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditing(null);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <Layout>
      <Header
        pendingCount={pendingCount}
        total={tasks.length}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />

      <div className="mb-6 flex items-center justify-between">
        <FilterButtons value={filter} onChange={setFilter} />

        <Button
          onClick={() => setShowForm(true)}
          className="hidden md:inline-flex bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Agregar tarea
        </Button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleComplete}
        onEdit={startEdit}
        onDelete={deleteTask}
        onView={setViewing} // 👈 le pasamos el handler
      />

      {/* Botón flotante en móviles */}
      <button
        onClick={() => setShowForm(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 cursor-pointer"
        title="Agregar tarea"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal de creación/edición */}
      {showForm && (
        <Modal
          title={editing ? "Editar tarea" : "Nueva tarea"}
          onClose={cancelEdit}
        >
          <TaskForm
            key={editing?.id || "new"}
            initialTask={editing}
            onCreate={(t) => { addTask(t); setShowForm(false); }}
            onUpdate={(t) => { updateTask(t); setShowForm(false); setEditing(null); }}
            onCancel={cancelEdit}
          />
        </Modal>
      )}

      {/* Modal de visualización */}
      {viewing && (
        <Modal title="Detalle de tarea" onClose={() => setViewing(null)}>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{viewing.title}</h2>
            {viewing.description && (
              <p className="text-gray-700 dark:text-gray-300">{viewing.description}</p>
            )}
            <p className="text-sm text-gray-500">
              Estado: {viewing.completed ? "✅ Completada" : "⏳ Pendiente"}
            </p>
          </div>
        </Modal>
      )}
    </Layout>
  );
}