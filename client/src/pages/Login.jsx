import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // AUTO LOGIN IF TOKEN EXISTS

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }

  }, [navigate]);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // LOGIN FUNCTION

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // CLEAR OLD TOKEN

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // LOGIN API

      const response = await axios.post(
        "https://taskflow-backend-ilde.onrender.com/api/users/login",
        formData
      );

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful");

      // REDIRECT

      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      console.log(error);

      if (error.response) {

        toast.error(
          error.response.data.message ||
          "Invalid Credentials"
        );

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

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-blue-500"
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-4 rounded-xl mb-6 outline-none focus:border-blue-500"
          />

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* FORGOT PASSWORD */}

          <p
            onClick={() => navigate("/forgot")}
            className="text-blue-500 cursor-pointer mt-4 text-center hover:underline"
          >
            Forgot Password?
          </p>

        </form>

        {/* REGISTER LINK */}

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;