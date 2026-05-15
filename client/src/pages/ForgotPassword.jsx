import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      await axios.put(
        "https://taskflow-backend-ilde.onrender.com/api/users/forgot-password",
        formData
      );

      toast.success("Password Updated");

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error("Failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-5"
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl"
        >
          Update Password
        </button>

      </form>

    </div>

  );
}

export default ForgotPassword;