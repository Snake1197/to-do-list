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

export default function App() {
  const { tasks, addTask, updateTask, toggleComplete, deleteTask, pendingCount } = useTasks();
  const [darkMode, setDarkMode] = useDarkMode();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("pending"); // 👈 por defecto pendientes

  const startEdit = (task) => {
    setEditing(task);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditing(null);
    setShowForm(false);
  };

  // 👇 Filtrado según el valor seleccionado
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
          className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Agregar tarea
        </Button>
      </div>

      <TaskList
        tasks={filteredTasks}
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
}