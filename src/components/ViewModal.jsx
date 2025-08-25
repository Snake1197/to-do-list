import Modal from "./Modal.jsx";
import { CheckCircle, Hourglass } from "lucide-react";

export default function ViewModal({ task, onClose }) {
  if (!task) return null;

  const { title, description, completed, createdAt, completedAt } = task;

  const statusText = completed ? "Completada" : "Pendiente";
  const statusIcon = completed ? (
    <CheckCircle size={16} />
  ) : (
    <Hourglass size={16} />
  );

  const statusClass = completed
    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d)
      ? "—"
      : d.toLocaleDateString("es-PE", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <Modal
      title="Detalle de tarea"
      onClose={onClose}
      aria-labelledby="task-title"
    >
      <div className="space-y-4 transition-all duration-300 ease-in-out max-w-full overflow-auto">
        {/* Título y descripción */}
        <section>
          <h2
            id="task-title"
            className="text-xl font-bold text-gray-900 dark:text-gray-100 break-words"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {description}
            </p>
          ) : (
            <p className="italic text-gray-400">Sin descripción</p>
          )}
        </section>

        {/* Estado */}
        <section
          aria-label="Estado de la tarea"
          className="flex items-center gap-2"
        >
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
          >
            {statusIcon}
            {statusText}
          </span>
        </section>

        {/* Fechas */}
        <section className="text-xs text-gray-500 space-y-1 break-words">
          {createdAt && <p>Creada: {formatDate(createdAt)}</p>}
          {completedAt && <p>Finalizada: {formatDate(completedAt)}</p>}
        </section>
      </div>
    </Modal>
  );
}
