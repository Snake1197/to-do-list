import Button from "./Button";
import { Filter } from "lucide-react";

export default function FilterButtons({ value, onChange }) {
  const filters = [
    { key: "all", label: "Todas" },
    { key: "pending", label: "Pendientes" },
    { key: "completed", label: "Completadas" },
  ];

  return (
    <section
      aria-label="Filtros de tareas"
      className="flex flex-wrap items-center gap-2 mb-4"
    >
      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
        <Filter size={16} />
        Filtrar:
      </span>

      {filters.map(({ key, label }) => (
        <Button
          key={key}
          size="sm"
          variant={value === key ? "activeFilter" : "filter"}
          onClick={() => onChange(key)}
          aria-pressed={value === key}
        >
          {label}
        </Button>
      ))}
    </section>
  );
}
