import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

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

      // REMINDERS

      response.data.forEach((task) => {

        const taskDateTime = new Date(
          `${task.date}T${task.time}`
        );

        const now = new Date();

        const diff = taskDateTime - now;

        if (diff > 0) {

          // 15 mins before

          if (diff > 15 * 60 * 1000) {

            setTimeout(() => {

              new Notification(
                `Reminder: ${task.title} in 15 mins`
              );

            }, diff - 15 * 60 * 1000);

          }

          // exact task time

          setTimeout(() => {

            new Notification(
              `Task Time: ${task.title}`
            );

          }, diff);

        }

      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch tasks");

    }

  }, [token]);

  // USE EFFECT

  useEffect(() => {

    Notification.requestPermission();

    fetchTasks();

  }, [fetchTasks]);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ADD TASK

  const addTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://taskflow-backend-ilde.onrender.com/api/tasks/add",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Added");

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to add task");

    }

  };

  // UPDATE STATUS

  const updateStatus = async (id) => {

    try {

      await axios.put(
        `https://taskflow-backend-ilde.onrender.com/api/tasks/update/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Completed");

      fetchTasks();

    } catch (error) {

      console.log(error);

      toast.error("Failed to update task");

    }

  };

  // DELETE TASK

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `https://taskflow-backend-ilde.onrender.com/api/tasks/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Deleted");

      fetchTasks();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete task");

    }

  };

  // EDIT TASK

  const editTask = async () => {

    try {

      await axios.put(
        `https://taskflow-backend-ilde.onrender.com/api/tasks/edit/${editingTask._id}`,
        {
          title: editingTask.title,
          description: editingTask.description,
          date: editingTask.date,
          time: editingTask.time,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Updated");

      setEditingTask(null);

      fetchTasks();

    } catch (error) {

      console.log(error);

      toast.error("Failed to edit task");

    }

  };

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  // DARK MODE

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
      className={`min-h-[100dvh] overflow-x-hidden transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

        {/* NAVBAR */}

        <div
          className={`flex flex-col lg:flex-row justify-between items-center gap-6 px-8 py-5 rounded-3xl shadow-2xl mb-10 ${
            darkMode
              ? "bg-gray-800/80 border border-gray-700"
              : "bg-white/80 border border-gray-200"
          }`}
        >

          <div>

            <h1 className="text-3xl font-bold">
              TaskFlow
            </h1>

            <p className="text-gray-400 mt-1">
              Organize your productivity
            </p>

          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">

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
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-2xl transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;