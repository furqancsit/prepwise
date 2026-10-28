import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
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
              <input
                id="name"
                name="name"
                type="text"
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
              <input
                id="email"
                name="email"
                type="email"
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
              <input
                id="password"
                name="password"
                type="password"
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

