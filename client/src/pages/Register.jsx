import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        "https://taskflow-backend-ilde.onrender.com/api/users/register",
        formData
      );

      toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1500);

    } catch (error) {

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }

    }

  };
    return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Register to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-6 outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-purple-600 font-semibold ml-1">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;