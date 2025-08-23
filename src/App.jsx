import { useState } from "react";
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
}