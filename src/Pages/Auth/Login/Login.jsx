import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Logged in successfully!");
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(17,25,40,0.85)] text-white">
      <div className="w-full max-w-lg p-10 rounded-3xl glass-card shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_0_12px_1px_rgba(168,85,247,0.3)]"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-[0_0_12px_1px_rgba(99,102,241,0.3)]"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold text-white hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/30"
          >
            Log In
          </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-pink-400 hover:text-indigo-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}