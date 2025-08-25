import Modal from "./Modal.jsx";
import TaskForm from "./TaskForm.jsx";

export default function TaskModal({ editing, onCreate, onUpdate, onCancel }) {
  return (
    <Modal title={editing ? "Editar tarea" : "Nueva tarea"} onClose={onCancel}>
      <TaskForm
        key={editing?.id || "new"}
        initialTask={editing}
        onCreate={(t) => { onCreate(t); onCancel(); }}
        onUpdate={(t) => { onUpdate(t); onCancel(); }}
        onCancel={onCancel}
      />
    </Modal>
  );
}
