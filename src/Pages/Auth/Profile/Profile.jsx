import { useState } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setSaved(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(17,25,40,0.85)] text-white">
      <div className="w-full max-w-lg p-10 rounded-3xl glass-card shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
          Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-[0_0_12px_1px_rgba(99,102,241,0.3)]"
            />
          </div>


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
          </div>

   
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-[0_0_12px_1px_rgba(236,72,153,0.3)]"
            />
          </div>

        
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold text-white hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/30"
          >
            Save Changes
          </button>

          {saved && (
            <p className="text-green-400 text-center text-sm mt-3">
              ✅ Profile saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}