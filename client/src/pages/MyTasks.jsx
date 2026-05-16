import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const token = localStorage.getItem("token");

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

  // FETCH TASKS

  const fetchTasks = useCallback(async () => {

    try {

      const response = await axios.get(
        "https://taskflow-backend-ilde.onrender.com/api/tasks/mytasks",
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

  }, [token]);

  useEffect(() => {

    fetchTasks();

  }, [fetchTasks]);

  // UNIQUE DATES

  const uniqueDates = [
    ...new Set(tasks.map((task) => task.date))
  ];

  // FILTER TASKS

  const filteredTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (

    <div
      className={`min-h-[100dvh] w-full overflow-x-hidden p-4 sm:p-6 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-100 text-black"
      }`}
    >

      <div className="max-w-7xl mx-auto">

        {/* NAVBAR */}

        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* PAGE TITLE */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 mt-10"
        >

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            My Tasks
          </h1>

          <p className="text-lg text-gray-400">
            Organize and track your daily productivity
          </p>

        </motion.div>

        {/* DATE BUTTONS */}

        <div className="flex flex-wrap gap-4 mb-12">

          {
            uniqueDates.map((date) => (

              <motion.button
                key={date}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}

                onClick={() =>
                  setSelectedDate(
                    selectedDate === date ? "" : date
                  )
                }

                className={`px-6 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 ${
                  selectedDate === date
                    ? "bg-purple-600 text-white"
                    : darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                }`}
              >

                {date}

              </motion.button>

            ))
          }

        </div>

        {/* TASKS */}

        <AnimatePresence mode="wait">

          {
            selectedDate && (

              <motion.div

                key={selectedDate}

                initial={{
                  opacity: 0,
                  y: 50
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                exit={{
                  opacity: 0,
                  y: -50
                }}

                transition={{
                  duration: 0.4
                }}

                className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
              >

                {
                  filteredTasks.length > 0 ? (

                    filteredTasks.map((task) => (

                      <motion.div

                        key={task._id}

                        whileHover={{
                          scale: 1.03
                        }}

                        className={`p-8 rounded-3xl shadow-2xl border transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                        }`}
                      >

                        {/* TITLE */}

                        <div className="flex justify-between items-start mb-6">

                          <h2 className="text-3xl font-bold leading-tight">

                            {task.title}

                          </h2>

                          <span
                            className={`px-4 py-2 rounded-2xl text-sm font-semibold text-white ${
                              task.status === "completed"
                                ? "bg-emerald-500"
                                : "bg-yellow-500"
                            }`}
                          >

                            {task.status}

                          </span>

                        </div>

                        {/* DESCRIPTION */}

                        <p className="text-gray-400 text-lg leading-8 mb-8">

                          {task.description}

                        </p>

                        {/* TIME */}

                        <div className="flex items-center justify-between">

                          <p className="text-lg font-medium">

                            ⏰ {task.time}

                          </p>

                          <div
                            className={`w-4 h-4 rounded-full ${
                              task.status === "completed"
                                ? "bg-emerald-500"
                                : "bg-yellow-500"
                            }`}
                          />

                        </div>

                      </motion.div>

                    ))

                  ) : (

                    <div
                      className={`p-10 rounded-3xl text-center shadow-xl ${
                        darkMode
                          ? "bg-gray-800"
                          : "bg-white"
                      }`}
                    >

                      <h2 className="text-3xl font-bold mb-4">

                        No Tasks

                      </h2>

                      <p className="text-gray-400">

                        No tasks available for this date

                      </p>

                    </div>

                  )
                }

              </motion.div>

            )
          }

        </AnimatePresence>

        {/* EMPTY STATE */}

        {
          !selectedDate && (

            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              className={`mt-10 p-16 rounded-3xl text-center shadow-2xl ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >

              <h2 className="text-4xl font-bold mb-6">

                Select a Date

              </h2>

              <p className="text-gray-400 text-lg leading-8">

                Click any date above to view tasks for that day.
                <br />
                Click the same date again to close the tasks.

              </p>

            </motion.div>

          )
        }

      </div>

    </div>

  );
}

export default MyTasks;