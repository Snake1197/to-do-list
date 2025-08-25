export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  size = "md",
  variant = "default",
  ...props
}) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    default: "",
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 border border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-200 dark:hover:bg-gray-200",

    filter:
      "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700",
    activeFilter: "bg-green-600 text-white border border-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`items-center justify-center gap-2 rounded-lg font-medium shadow-sm transition-all duration-200 ease-in-out
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-[1.02] active:scale-95"
        }
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
