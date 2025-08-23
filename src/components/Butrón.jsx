export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 font-medium shadow cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}