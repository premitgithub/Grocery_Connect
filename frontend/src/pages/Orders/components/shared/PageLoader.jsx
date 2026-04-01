/** Reusable full-screen loading spinner */
const PageLoader = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-teal-50 dark:bg-slate-900 flex flex-col items-center justify-center transition-colors">
    <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
    <p className="mt-4 text-teal-700 dark:text-teal-300 font-semibold animate-pulse">{message}</p>
  </div>
);

export default PageLoader;
