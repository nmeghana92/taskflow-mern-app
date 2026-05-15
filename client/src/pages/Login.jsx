import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }

    }

  };
    return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-6 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
                    <p
            onClick={() => navigate("/forgot")}
            className="text-blue-500 cursor-pointer mt-4 text-center"
          >
            Forgot Password?
          </p>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-600 font-semibold ml-1">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;