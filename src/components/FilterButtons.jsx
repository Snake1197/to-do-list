import Button from "./Button";

export default function FilterButtons({ value, onChange }) {
  const filters = [
    { key: "all", label: "Todas" },
    { key: "pending", label: "Pendientes" },
    { key: "completed", label: "Completadas" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={
            value === f.key
              ? "bg-green-600 text-white border border-green-600"
              : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border"
          }
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
}