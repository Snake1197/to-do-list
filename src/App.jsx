import { useState, useCallback } from "react";
import { useDarkMode } from "./hooks/useDarkMode.js";
import { useTasks } from "./hooks/useTasks.js";
import { useTaskFilter } from "./hooks/useTaskFilter.js";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterButtons from "./components/FilterButtons.jsx";
import Button from "./components/Button.jsx";
import FloatingButton from "./components/FloatingButton.jsx";

import TaskModal from "./components/TaskModal.jsx";
import ViewModal from "./components/ViewModal.jsx";

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    pendingCount,
  } = useTasks();

  const [darkMode, setDarkMode] = useDarkMode();
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("pending");

  const filteredTasks = useTaskFilter(tasks, filter);

  const handleToggleTheme = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  const handleAddClick = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditing(task);
    setShowForm(true);
  }, []);

  const handleCancelForm = useCallback(() => {
    setEditing(null);
    setShowForm(false);
  }, []);

  const handleCloseView = useCallback(() => {
    setViewing(null);
  }, []);

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
          variant="primary"
          size="md"
          className="hidden sm:hidden md:inline-flex"
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

      <FloatingButton onClick={handleAddClick} />

      {showForm && (
        <TaskModal
          editing={editing}
          onCreate={addTask}
          onUpdate={updateTask}
          onCancel={handleCancelForm}
        />
      )}

      {viewing && <ViewModal task={viewing} onClose={handleCloseView} />}
    </Layout>
  );
}
