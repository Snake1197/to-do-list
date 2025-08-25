export default function Layout({ children }) {
  return (
    <main
      className="min-h-screen w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      role="main"
    >
      {children}
    </main>
  );
}
