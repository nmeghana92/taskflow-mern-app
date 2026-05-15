import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

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

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tasks/mytasks",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const uniqueDates = [
    ...new Set(tasks.map((task) => task.date))
  ];

  const filteredTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (

    <div
      className={`min-h-[100dvh] p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-black"
      }`}
    >

      <div className="max-w-7xl mx-auto">

        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >

          <h1 className="text-6xl font-bold mb-12">
            My Tasks
          </h1>

          <div className="flex flex-wrap gap-5 mb-12">

            {
              uniqueDates.map((date) => (

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={date}
                  onClick={() =>
                    setSelectedDate(
                        selectedDate === date ? "" : date
                    )
                }
                  className={`px-8 py-4 rounded-2xl shadow-xl transition ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {date}
                </motion.button>

              ))
            }

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {
              filteredTasks.map((task) => (

                <motion.div
                  key={task._id}
                  whileHover={{ scale: 1.03 }}
                  className={`p-8 rounded-3xl shadow-2xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >

                  <h2 className="text-4xl font-bold mb-5">
                    {task.title}
                  </h2>

                  <p className="text-gray-400 text-lg leading-8 mb-6">
                    {task.description}
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="text-lg">
                      {task.time}
                    </span>

                    <span
                      className={`px-5 py-2 rounded-2xl text-white ${
                        task.status === "completed"
                          ? "bg-emerald-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task.status}
                    </span>

                  </div>

                </motion.div>

              ))
            }

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default MyTasks;