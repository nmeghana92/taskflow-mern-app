import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-[100dvh] bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white overflow-x-hidden">

      {/* NAVBAR */}

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        <h1 className="text-4xl font-bold">
          TaskFlow
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 font-semibold transition"
          >
            Get Started
          </button>

        </div>

      </div>

      {/* HERO SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight mb-8">

            Manage Your Daily Tasks Smarter

          </h1>

          <p className="text-gray-300 text-xl leading-10 mb-10">

            Organize tasks, track productivity, manage deadlines,
            and improve your daily workflow with TaskFlow.

          </p>

          <div className="flex flex-wrap gap-5">

            <button
              onClick={() => navigate("/register")}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-5 rounded-3xl text-xl font-semibold transition"
            >
              Start Now
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-white px-8 py-5 rounded-3xl text-xl font-semibold hover:bg-white hover:text-black transition"
            >
              Login
            </button>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-[40px] shadow-2xl border border-white/20">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Today's Progress
              </h2>

              <span className="bg-emerald-500 px-5 py-2 rounded-2xl">
                85%
              </span>

            </div>

            <div className="space-y-5">

              <div className="bg-white/10 p-5 rounded-2xl">
                ✅ Complete React Dashboard
              </div>

              <div className="bg-white/10 p-5 rounded-2xl">
                ⏰ Prepare for Interview
              </div>

              <div className="bg-white/10 p-5 rounded-2xl">
                📚 Learn Backend APIs
              </div>

              <div className="bg-white/10 p-5 rounded-2xl">
                🚀 Deploy MERN Project
              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* FEATURES */}

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-5xl font-bold text-center mb-16">

          Features

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

            <h3 className="text-2xl font-bold mb-5">
              Task Management
            </h3>

            <p className="text-gray-300 leading-8">
              Add, edit, delete, and organize daily tasks easily.
            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

            <h3 className="text-2xl font-bold mb-5">
              Productivity Tracking
            </h3>

            <p className="text-gray-300 leading-8">
              Track your completion percentage and progress.
            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

            <h3 className="text-2xl font-bold mb-5">
              Smart Reminders
            </h3>

            <p className="text-gray-300 leading-8">
              Get notified before your task deadlines.
            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

            <h3 className="text-2xl font-bold mb-5">
              Responsive Design
            </h3>

            <p className="text-gray-300 leading-8">
              Works perfectly on mobile, tablet, and desktop.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;