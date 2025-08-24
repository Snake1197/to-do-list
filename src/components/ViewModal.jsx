import Modal from "./Modal.jsx";

export default function ViewModal({ task, onClose }) {
  if (!task) return null;

  return (
    <Modal title="Detalle de tarea" onClose={onClose}>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        {task.description && (
          <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
        )}
        <p className="text-sm text-gray-500">
          Estado: {task.completed ? "✅ Completada" : "⏳ Pendiente"}
        </p>
      </div>
    </Modal>
  );
}
