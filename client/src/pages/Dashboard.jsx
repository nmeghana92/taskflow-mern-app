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

        {/* ADD TASK */}

        <div
          className={`p-8 rounded-3xl shadow-2xl mb-10 ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >

          <h2 className="text-3xl font-bold mb-6">
            Add New Task
          </h2>

          <form
            onSubmit={addTask}
            className="grid gap-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border outline-none text-black"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border outline-none text-black"
            />

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="p-4 rounded-2xl border outline-none text-black"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="p-4 rounded-2xl border outline-none text-black"
              />

            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
            >
              Add Task
            </button>

          </form>

        </div>

        {/* TASKS */}

        <div className="grid md:grid-cols-2 gap-8">

          {tasks.map((task) => (

            <div
              key={task._id}
              className={`p-8 rounded-3xl shadow-2xl ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-3xl font-bold">
                  {task.title}
                </h2>

                <span
                  className={`px-4 py-2 rounded-2xl text-white ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <p className="text-gray-400 mb-5">
                {task.description}
              </p>

              <p className="mb-6">
                {task.date} | {task.time}
              </p>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    updateStatus(task._id)
                  }
                  className="bg-green-500 text-white px-5 py-2 rounded-2xl"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-2xl"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    setEditingTask(task)
                  }
                  className="bg-blue-500 text-white px-5 py-2 rounded-2xl"
                >
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* EDIT MODAL */}

        {editingTask && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

            <div className="bg-white p-8 rounded-3xl w-full max-w-lg">

              <h2 className="text-3xl font-bold mb-6 text-black">
                Edit Task
              </h2>

              <div className="grid gap-4">

                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl border text-black"
                />

                <textarea
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl border text-black"
                />

                <input
                  type="date"
                  value={editingTask.date}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      date: e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl border text-black"
                />

                <input
                  type="time"
                  value={editingTask.time}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      time: e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl border text-black"
                />

                <div className="flex gap-4">

                  <button
                    onClick={editTask}
                    className="bg-green-500 text-white px-5 py-3 rounded-2xl w-full"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingTask(null)
                    }
                    className="bg-red-500 text-white px-5 py-3 rounded-2xl w-full"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;