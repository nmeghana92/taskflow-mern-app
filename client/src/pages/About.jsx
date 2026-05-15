import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

function About() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );

  };

  return (

    <div
      className={`min-h-[100dvh] p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-black"
      }`}
    >

      <div className="max-w-7xll mx-auto">

        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >

          <h1 className="text-6xl font-bold mb-8">
            About TaskFlow
          </h1>

          <p className="text-xl leading-10 text-gray-400 mb-10">

            TaskFlow is a modern productivity and task management web application
            built using the MERN Stack.

            It helps users manage daily work, organize schedules,
            track progress, and improve productivity using a beautiful
            modern interface.

          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                MERN Stack
              </h2>

              <p className="leading-8">
                Built using MongoDB, Express.js, React.js and Node.js.
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                Authentication
              </h2>

              <p className="leading-8">
                Secure JWT authentication with protected routes.
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-emerald-600 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                Productivity
              </h2>

              <p className="leading-8">
                Organize work efficiently and complete tasks on time.
              </p>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default About;