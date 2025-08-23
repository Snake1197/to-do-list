import { useState } from "react";

export default function TaskForm({ initialTask, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (title.length > 100) {
      setError("El título no puede superar los 100 caracteres.");
      return;
    }

    if (description.length > 500) {
      setError("La descripción no puede superar los 500 caracteres.");
      return;
    }

    const newTask = {
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      createdAt: initialTask?.createdAt || new Date().toISOString(),
      completed: initialTask?.completed || false,
      id: initialTask?.id || crypto.randomUUID(),
    };

    if (initialTask) {
      onUpdate(newTask);
    } else {
      onCreate(newTask);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        rows="4"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {initialTask ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}