import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import MyTasks from "./pages/MyTasks";
import MyAccount from "./pages/MyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/mytasks"
          element={<MyTasks />}
        />

        <Route
          path="/account"
          element={<MyAccount />}
        />

        <Route
          path="/forgot"
          element={<ForgotPassword />}
        />

      </Routes>

      <ToastContainer />

    </BrowserRouter>

  );
}

export default App;