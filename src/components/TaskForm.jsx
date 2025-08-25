import { useState } from "react";

const TITLE_MAX = 100;
const DESC_MAX = 500;

// Recorta por puntos de código (soporta emojis y caracteres especiales)
const clip = (str, max) => Array.from(str).slice(0, max).join("");

export default function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [error, setError] = useState("");

  const isEditing = Boolean(initialTask);
  const actionLabel = isEditing ? "Actualizar" : "Crear";

  const handleTitleChange = (e) => setTitle(clip(e.target.value, TITLE_MAX));
  const handleDescChange = (e) =>
    setDescription(clip(e.target.value, DESC_MAX));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedTitle = clip(title.trim(), TITLE_MAX);
    const trimmedDesc = clip(description.trim(), DESC_MAX);

    if (!trimmedTitle) {
      setError("El título es obligatorio.");
      return;
    }

    const payload = {
      ...initialTask,
      id: initialTask?.id ?? crypto.randomUUID(),
      title: trimmedTitle,
      description: trimmedDesc,
      createdAt: initialTask?.createdAt ?? new Date().toISOString(),
      completed: initialTask?.completed ?? false,
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label={`${actionLabel} tarea`}
    >
      {error && (
        <div
          role="alert"
          className="p-2 bg-red-100 text-red-700 rounded-lg text-sm"
        >
          {error}
        </div>
      )}

      {/* Campo: Título */}
      <div>
        <label htmlFor="task-title" className="block text-sm mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          maxLength={TITLE_MAX}
          aria-describedby="title-counter"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Título de la tarea"
          required
        />
        <div id="title-counter" className="mt-1 text-xs text-gray-500">
          {Array.from(title).length}/{TITLE_MAX}
        </div>
      </div>

      {/* Campo: Descripción */}
      <div>
        <label htmlFor="task-desc" className="block text-sm mb-1">
          Descripción
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={handleDescChange}
          maxLength={DESC_MAX}
          aria-describedby="desc-counter"
          rows={4}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Descripción (opcional)"
        />
        <div id="desc-counter" className="mt-1 text-xs text-gray-500">
          {Array.from(description).length}/{DESC_MAX}
        </div>
      </div>

      {/* Botones */}
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
          {actionLabel}
        </button>
      </div>
    </form>
  );
}
