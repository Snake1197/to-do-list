export default function Layout({ children }) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
}