import { useNavigate } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

/** Reusable full-screen error card with back-to-orders button */
const PageError = ({ message, emoji = null, backTo = "/orders", backLabel = "Back to Orders" }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-teal-50 dark:bg-slate-900 flex items-center justify-center p-6 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100 dark:border-slate-700">
        {emoji
          ? <div className="text-5xl mb-4">{emoji}</div>
          : <FiInfo className="text-red-500 w-16 h-16 mx-auto mb-4" />}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops!</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-6">{message || "Something went wrong."}</p>
        <button
          onClick={() => navigate(backTo)}
          className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 transition-colors"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
};

export default PageError;
