import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

function MyAccount() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [tasks, setTasks] = useState([]);

  const [editData, setEditData] = useState({
    role: user?.role || "",
    skills: user?.skills || "",
    bio: user?.bio || "",
  });

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

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

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

  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const productivityScore =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  const todayCompleted = todayTasks.filter(
    (task) => task.status === "completed"
  );

  const dailyProgress =
    todayTasks.length === 0
      ? 0
      : Math.round(
          (
            todayCompleted.length /
            todayTasks.length
          ) * 100
        );

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  const updateProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://taskflow-backend-ilde.onrender.com/api/users/update-profile",
        editData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className={`min-h-[100dvh] p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-blue-100 text-black"
      }`}
    >

      <div className="max-w-7xl mx-auto">

        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >

          {/* PROFILE */}

          <div className="flex flex-col md:flex-row items-center gap-10 mb-12">

            <div className="w-36 h-36 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-7xl font-bold shadow-2xl">

              {user?.name?.charAt(0)}

            </div>

            <div>

              <h1 className="text-6xl font-bold mb-4">
                {user?.name}
              </h1>

              <p className="text-2xl text-gray-400">
                {user?.role || "User"}
              </p>

            </div>

          </div>

          {/* EDIT PROFILE */}

          <div className="mb-10 space-y-5">

            <input
              type="text"
              placeholder="Role"
              value={editData.role}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  role: e.target.value,
                })
              }
              className={`w-full p-4 rounded-2xl border outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Skills"
              value={editData.skills}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  skills: e.target.value,
                })
              }
              className={`w-full p-4 rounded-2xl border outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            />

            <textarea
              placeholder="Bio"
              value={editData.bio}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  bio: e.target.value,
                })
              }
              className={`w-full p-4 rounded-2xl border outline-none h-32 ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            />

            <button
              onClick={updateProfile}
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-4 rounded-2xl"
            >
              Save Profile
            </button>

          </div>

          {/* INFO CARDS */}

          <div className="grid md:grid-cols-2 gap-8 mb-10">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-violet-500 to-purple-500 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                Email
              </h2>

              <p className="text-xl break-all">
                {user?.email}
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-sky-500 to-blue-500 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                Skills
              </h2>

              <p className="text-xl leading-9">
                {user?.skills || "No skills added"}
              </p>

            </motion.div>

          </div>

          {/* ANALYTICS */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-violet-500 to-purple-500 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-2xl font-bold mb-4">
                Productivity Score
              </h2>

              <p className="text-6xl font-bold">
                {productivityScore}%
              </p>

              <div className="w-full bg-white/20 h-3 rounded-full mt-6">

                <div
                  style={{
                    width: `${productivityScore}%`,
                  }}
                  className="bg-white h-3 rounded-full"
                ></div>

              </div>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-2xl font-bold mb-4">
                Daily Progress
              </h2>

              <p className="text-6xl font-bold">
                {dailyProgress}%
              </p>

              <div className="w-full bg-white/20 h-3 rounded-full mt-6">

                <div
                  style={{
                    width: `${dailyProgress}%`,
                  }}
                  className="bg-white h-3 rounded-full"
                ></div>

              </div>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-sky-500 to-blue-500 p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-2xl font-bold mb-4">
                Task Consistency
              </h2>

              <p className="text-4xl font-bold">

                {
                  productivityScore >= 80
                    ? "Excellent"
                    : productivityScore >= 50
                    ? "Good"
                    : "Needs Work"
                }

              </p>

              <p className="mt-6 text-lg text-white/80">
                Keep completing tasks consistently.
              </p>

            </motion.div>

          </div>

          {/* ABOUT */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 rounded-3xl shadow-xl mb-10"
          >

            <h2 className="text-3xl font-bold mb-4">
              About Me
            </h2>

            <p className="text-xl leading-10">
              {user?.bio || "No bio added"}
            </p>

          </motion.div>

          {/* LOGOUT */}

          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-5 rounded-3xl text-2xl font-semibold transition"
          >
            Logout
          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default MyAccount;