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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
      <div className="w-full max-w-lg bg-[rgba(17,25,40,0.85)] p-10 rounded-3xl shadow-lg border border-white/10">
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
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold text-white hover:scale-[1.02] transition-transform"
          >
            Log In
          </button>
        </form>

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
