import { useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTasks } from "./hooks/useTasks";
import { useTaskFilter } from "./hooks/useTaskFilter";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterButtons from "./components/FilterButtons.jsx";
import Button from "./components/Button.jsx";
import { Plus } from "lucide-react";

import TaskModal from "./components/TaskModal.jsx";
import ViewModal from "./components/ViewModal.jsx";

export default function App() {
  const { tasks, addTask, updateTask, toggleComplete, deleteTask, pendingCount } = useTasks();
  const [darkMode, setDarkMode] = useDarkMode();
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("pending");

  const filteredTasks = useTaskFilter(tasks, filter);

  // 🔹 Funciones externas para claridad y buenas prácticas
  function handleToggleTheme() {
    setDarkMode(!darkMode);
  }

  function handleAddClick() {
    setShowForm(true);
  }

  function handleEditTask(task) {
    setEditing(task);
    setShowForm(true);
  }

  function handleCancelForm() {
    setEditing(null);
    setShowForm(false);
  }

  function handleCloseView() {
    setViewing(null);
  }

  return (
    <Layout>
      <Header
        pendingCount={pendingCount}
        total={tasks.length}
        darkMode={darkMode}
        toggleTheme={handleToggleTheme}
      />

      <div className="mb-6 flex items-center justify-between">
        <FilterButtons value={filter} onChange={setFilter} />
        <Button
          onClick={handleAddClick}
          className="hidden md:inline-flex bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Agregar tarea
        </Button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleComplete}
        onEdit={handleEditTask}
        onDelete={deleteTask}
        onView={setViewing}
      />

      {/* Botón flotante móvil */}
      <button
        onClick={handleAddClick}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 cursor-pointer"
        title="Agregar tarea"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showForm && (
        <TaskModal
          editing={editing}
          onCreate={addTask}
          onUpdate={updateTask}
          onCancel={handleCancelForm}
        />
      )}

      {viewing && (
        <ViewModal task={viewing} onClose={handleCloseView} />
      )}
    </Layout>
  );
}
