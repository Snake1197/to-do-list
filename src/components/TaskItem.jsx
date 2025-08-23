import { useState, useMemo } from "react";
import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";

/* Util: limpia caracteres raros y normaliza espacios. */
function sanitizeText(str = "") {
  const normalized = String(str)
    .normalize("NFC") // normaliza acentos y tildes
    .replace(/\s+/g, " ") // colapsa múltiples espacios
    .trim();

  // Acepta letras con acentos, ñ, números, espacios y puntuación básica
  return normalized.replace(
    /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:!?()"'_-]/g,
    ""
  );
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  // Texto saneado (evita símbolos raros)
  const safeTitle = useMemo(() => sanitizeText(task?.title), [task?.title]);
  const safeDesc = useMemo(
    () => (task?.description ? sanitizeText(task.description) : ""),
    [task?.description]
  );

  // Estilos para cortar texto
  const clampTitle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const clampDesc = {
    display: "-webkit-box",
    WebkitLineClamp: 2, // máximo 2 líneas
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const createdLabel = useMemo(() => {
    try {
      return task?.createdAt ? new Date(task.createdAt).toLocaleString() : "-";
    } catch {
      return "-";
    }
  }, [task?.createdAt]);

  return (
   
      <li className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow flex items-start gap-3 w-full">
        {/* Botón para marcar completada */}
        <button
          onClick={onToggle}
          className="mt-1 cursor-pointer shrink-0"
          title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
          aria-pressed={task.completed}
        >
          {task.completed ? (
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          ) : (
            <Circle className="h-6 w-6 text-gray-400 dark:text-gray-600" />
          )}
        </button>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            {/* Texto (ocupa lo flexible) */}
            <div className="grow min-w-0">
              <h3
                className={`font-semibold ${
                  task.completed ? "line-through opacity-60" : ""
                }`}
                style={clampTitle}
                title={safeTitle} /* muestra completo al hover */
              >
                {safeTitle}
              </h3>

              {safeDesc && (
                <p
                  className={`text-sm text-gray-600 dark:text-gray-300 ${
                    task.completed ? "line-through opacity-60" : ""
                  }`}
                  style={clampDesc}
                  title={safeDesc}
                >
                  {safeDesc}
                </p>
              )}
            </div>

            {/* Acciones (no se encogen) */}
            <div className="flex items-center gap-2 flex-none shrink-0">
              {/* Botón Editar */}
              <button
                onClick={onEdit}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                title="Editar"
                aria-label="Editar tarea"
              >
                <Pencil className="h-4 w-4" />
              </button>

              {/* Botón Eliminar */}
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer"
                title="Eliminar"
                aria-label="Eliminar tarea"
              >
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-500">Creada: {createdLabel}</p>
        </div>
      </li>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirmar eliminación</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              ¿Seguro que deseas eliminar la tarea <strong>{safeTitle}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    
  );
}