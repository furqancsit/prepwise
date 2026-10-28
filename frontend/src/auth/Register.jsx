import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./context/authContextProvider";
import { getErrorMessage } from "../utils/getErrorMessage";
import { loginWithGoogle } from "./services/authService";
export const Register = () => {
  const navigate = useNavigate();
const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
};
=======

const Register = () => {
  const navigate = useNavigate();
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

<<<<<<< HEAD
  
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
=======
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/v1/auth/register",
        formData,
      );

      setSuccess(response.data.message || "Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD




  const { setUser } = useAuth();
  

  const handleGoogleSuccess = async ({ credential }) => {
    if (!credential || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await loginWithGoogle(credential);
      setUser(response.user);
      navigate("/dash");
    } catch (error) {
      setError(getErrorMessage(error, "Google signup failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5 py-10 text-[#242321]">
      <div className="w-full max-w-[400px]">
        <Link to="/" className="mb-10 flex items-center justify-center gap-2.5">
           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6d5ce8] text-white shadow-sm shadow-violet-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m5 12 4 4L19 6" />
              <path d="M12 22a10 10 0 1 0-10-10" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight">prepwise</span>
        </Link>

        <div className="rounded-2xl border border-[#242321]/[0.09] bg-white p-6 shadow-[0_16px_50px_-35px_rgba(36,35,33,0.25)] sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[#77746f]">
            Start preparing for your next interview.
          </p>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google signup failed. Please try again.")}
              text="signup_with"
              theme="outline"
              shape="rectangular"
              size="large"
              width="320"
            />
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#242321]/10" />
            <span className="text-xs text-[#96918a]">OR SIGN UP WITH EMAIL</span>
            <div className="h-px flex-1 bg-[#242321]/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full name
              </label>
=======
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
              <span className="text-2xl font-bold">R</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

            <p className="mt-2 text-sm text-gray-500">
              Register to get started
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
              <input
                id="name"
                name="name"
                type="text"
<<<<<<< HEAD
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email address
              </label>
=======
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
              <input
                id="email"
                name="email"
                type="email"
<<<<<<< HEAD
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
=======
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
              <input
                id="password"
                name="password"
                type="password"
<<<<<<< HEAD
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#6d5ce8] px-4 text-sm font-semibold text-white transition hover:bg-[#5c4bd4] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#77746f]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#6d5ce8] hover:text-[#5544cf]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#96918a]">
          By joining, you agree to our{" "}
          <Link to="/terms" className="underline underline-offset-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

=======
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
