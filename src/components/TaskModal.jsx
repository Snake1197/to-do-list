import Modal from "./Modal.jsx";
import TaskForm from "./TaskForm.jsx";

export default function TaskModal({ editing, onCreate, onUpdate, onCancel }) {
  const isEditing = Boolean(editing);
  const modalTitle = isEditing ? "Editar tarea" : "Nueva tarea";
  const formKey = editing?.id || "new";

  const handleSubmit = (task) => {
    if (isEditing) {
      onUpdate(task);
    } else {
      onCreate(task);
    }
    onCancel();
  };

  return (
    <Modal title={modalTitle} onClose={onCancel}>
      <TaskForm
        key={formKey}
        initialTask={editing}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
}
