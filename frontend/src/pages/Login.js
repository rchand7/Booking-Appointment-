import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      alert("Login Error: " + message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-3xl mb-6 font-bold">Login</h2>

      <input
        className="border p-3 mb-3 w-80 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-3 mb-4 w-80 rounded"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
      >
        Login
      </button>
    </div>
  );
}