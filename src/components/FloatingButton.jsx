import { Plus } from "lucide-react";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 cursor-pointer"
      title="Agregar tarea"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
