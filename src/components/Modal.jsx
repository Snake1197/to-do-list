import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg max-h-screen overflow-y-auto p-6 relative transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
