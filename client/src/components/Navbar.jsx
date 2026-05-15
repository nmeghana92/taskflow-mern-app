import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ darkMode, toggleDarkMode }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-between items-center px-8 py-5 rounded-3xl shadow-2xl mb-10 ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >

      <div>

        <h1 className="text-3xl font-bold tracking-wide">
          TaskFlow
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Organize your productivity
        </p>

      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 font-medium">

        <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-purple-500 transition"
        >
            Dashboard
        </button>

        <button
            onClick={() => navigate("/about")}
            className="hover:text-purple-500 transition"
        >
            About
        </button>

        <button
            onClick={() => navigate("/mytasks")}
            className="hover:text-purple-500 transition"
        >
            My Tasks
        </button>

        <button
            onClick={() => navigate("/account")}
            className="hover:text-purple-500 transition"
        >
            My Account
        </button>

        <button
            onClick={toggleDarkMode}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-2xl transition"
        >
            {darkMode ? "Light" : "Dark"}
        </button>

        <button
            onClick={logout}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-2xl transition"
        >
            Logout
        </button>

        </div>

    </motion.div>
  );
}

export default Navbar;