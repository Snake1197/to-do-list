import { useState } from "react";
import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <li className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow flex items-start gap-3">
        {/* Botón para marcar completada */}
        <button
          onClick={onToggle}
          className="mt-1 cursor-pointer"
          title={
            task.completed ? "Marcar como pendiente" : "Marcar como completada"
          }
        >
          {task.completed ? (
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          ) : (
            <Circle className="h-6 w-6 text-gray-400 dark:text-gray-600" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className={`font-semibold ${
                  task.completed ? "line-through opacity-60" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm text-gray-600 dark:text-gray-300 ${
                    task.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Botón Editar */}
              <button
                onClick={onEdit}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                title="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>

              {/* Botón Eliminar */}
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer"
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Creada: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
      </li>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              ¿Seguro que deseas eliminar la tarea <strong>{task.title}</strong>
              ?
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
    </>
  );
}
