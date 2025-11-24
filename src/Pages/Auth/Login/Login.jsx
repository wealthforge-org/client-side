import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { loginUser } from "../../../API/InternalApis/LoginApi.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; 
  const validate = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage("");
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const data = await loginUser(form.email, form.password);
        setApiMessage("Login successful!");
        setForm({ email: "", password: "" });
        localStorage.setItem("user", data.userId);
        localStorage.setItem("name", data.name);
        localStorage.setItem("isSignedIn", true);


        navigate("/market");
      } catch (err) {
        setApiMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(17,25,40,0.85)] text-white">
      <div className="w-full max-w-lg p-10 rounded-3xl glass-card shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg bg-white text-gray-900"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg bg-white text-gray-900"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {apiMessage && (
            <p
              className={`text-center ${
                apiMessage.includes("successful")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {apiMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold text-white hover:scale-[1.02] transition-transform"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-pink-400 hover:text-indigo-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
