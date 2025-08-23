import { useEffect, useState } from "react";

export default function TaskForm({
  initialTask,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const isEditing = Boolean(initialTask);
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [title, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (isEditing) {
      onUpdate({
        ...initialTask,
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      onCreate({
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow"
    >
      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Título de la tarea *"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción (opcional)"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring min-h-[96px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-xl px-4 py-2 font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 cursor-pointer"
          >
            {isEditing ? "Guardar cambios" : "Agregar tarea"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl px-4 py-2 font-medium border border-gray-300 dark:border-gray-700 cursor-pointer"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
