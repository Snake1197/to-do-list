import { useState } from "react";

const TITLE_MAX = 100;
const DESC_MAX  = 500;

// Cuenta por puntos de código (evita errores con emojis/acentos)
const clip = (str, max) => Array.from(str).slice(0, max).join("");

export default function TaskForm({ initialTask, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [error, setError] = useState("");

  const onTitleChange = (e) => {
    // Recorta al vuelo, también cuando pegan texto largo
    setTitle(clip(e.target.value, TITLE_MAX));
  };

  const onDescChange = (e) => {
    setDescription(clip(e.target.value, DESC_MAX));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const t = clip(title.trim(), TITLE_MAX);
    const d = clip(description.trim(), DESC_MAX);

    if (!t) {
      setError("El título es obligatorio.");
      return;
    }

    const payload = {
      ...initialTask,
      id: initialTask?.id ?? crypto.randomUUID(),
      title: t,
      description: d,
      createdAt: initialTask?.createdAt ?? new Date().toISOString(),
      completed: initialTask?.completed ?? false,
    };

    initialTask ? onUpdate(payload) : onCreate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          maxLength={TITLE_MAX}             // Capa 1: límite UI
          aria-describedby="title-counter"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Título de la tarea"
          required
        />
        <div id="title-counter" className="mt-1 text-xs text-gray-500">
          {Array.from(title).length}/{TITLE_MAX}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={onDescChange}
          maxLength={DESC_MAX}              // Capa 1: límite UI
          aria-describedby="desc-counter"
          rows={4}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Descripción (opcional)"
        />
        <div id="desc-counter" className="mt-1 text-xs text-gray-500">
          {Array.from(description).length}/{DESC_MAX}
        </div>
      </div>

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