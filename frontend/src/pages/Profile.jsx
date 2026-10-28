
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  UserRound,
  LockKeyhole,
  LayoutDashboard,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../auth/context/authContextProvider";


export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
 
  const {user} =useAuth()

  useEffect(() => {
  if (!user) return;

  setProfile({
    name: user.name ?? "",
    email: user.email ?? "",
  });

  setLoading(false);
}, [user]);
  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      const { data } = await axios.put(
        "/api/profile",
        profile
      );

      setProfile({
        name: data.name ?? profile.name,
        email: data.email ?? profile.email,
      });

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setChangingPassword(true);

    try {
      await axios.put("/api/v1/auth/profile/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading profile...
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar */}
        

        {/* Main content */}
        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-12">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <p className="mb-2 text-sm font-medium text-indigo-600">
              Account settings
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              My profile
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your personal information and account security.
            </p>
          </header>

          {message && (
            <div
              role="status"
              className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Profile card */}
          <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
                {profile.name
                  .split(" ")
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {profile.name || "Your profile"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {profile.email}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <ShieldCheck size={14} />
                  Account settings
                </span>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                <UserRound size={20} />
              </div>
              <div>
                <h3 className="font-semibold">
                  Personal information
                </h3>
                <p className="text-sm text-slate-500">
                  Update your name and email address.
                </p>
              </div>
            </div>

            <form onSubmit={saveProfile} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className={inputClass}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-11`}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>

          {/* Password card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <LockKeyhole size={20} />
              </div>
              <div>
                <h2 className="font-semibold">
                  Change password
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep your account secure with a strong password.
                </p>
              </div>
            </div>

            <form
              onSubmit={updatePassword}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-slate-700"
                >
                  Current password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-slate-700"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-slate-700"
                >
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword
                    ? "Updating..."
                    : "Update password"}
                </button>
              </div>
            </form>
          </section>

          <p className="mt-6 text-center text-xs text-slate-400">
            Keep your account information up to date.
          </p>
        </main>
      </div>
    </div>
  );
}
