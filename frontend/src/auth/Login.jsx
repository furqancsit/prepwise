import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login, loginWithGoogle } from "./services/authService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { GoogleAuthButton } from "./ui/GoogleAuthButton";
import { useAuth } from "./context/authContextProvider";


const INITIAL_FORM = {
  email: "",
  password: "",
};

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const userData = await login(form);
      setUser(userData.user);
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error, "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async ({ credential }) => {
    if (!credential || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await loginWithGoogle(credential);
      setUser(response.user);
      navigate("/dash");
    } catch (error) {
      setError(
        getErrorMessage(error, "Google login failed. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login was unsuccessful. Please try again.");
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#242321]">
      <div className=" flex min-h-screen max-w-7xl mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24 flex-col px-5 sm:px-8">
       

        {/* Main content */}
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-20 lg:py-16">
          {/* Left promotional panel */}
          <section className="mx-auto hidden w-full max-w-xl lg:block">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#6d5ce8]/20 bg-[#6d5ce8]/[0.07] px-3.5 py-2 text-sm font-medium text-[#5b4bd4]">
              <span className="h-2 w-2 rounded-full bg-[#6d5ce8]" />
              Your next opportunity starts here
            </div>

            <h1 className="max-w-lg text-5xl font-semibold leading-[1.12] tracking-[-0.055em] xl:text-6xl">
              Walk into your next interview{" "}
              <span className="text-[#6d5ce8]">with confidence.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-[#77746f]">
              Practice real interview questions, sharpen your answers, and
              turn every practice session into progress.
            </p>

            {/* Decorative interview preview */}
            <div className="relative mt-12 max-w-md">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#e9e4ff] blur-2xl" />
              <div className="absolute -bottom-5 right-8 h-24 w-24 rounded-full bg-[#f5dfc8] blur-2xl" />

              <div className="relative rounded-2xl border border-[#242321]/[0.09] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(36,35,33,0.25)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Practice session</p>
                    <p className="mt-1 text-xs text-[#96918a]">
                      Behavioral interview
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#f0edff] px-3 py-1.5 text-xs font-semibold text-[#6d5ce8]">
                    In progress
                  </span>
                </div>

                <div className="mt-6 rounded-xl bg-[#faf9f6] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#96918a]">
                    Interview question
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6">
                    “Tell me about a challenge you overcame and what you
                    learned from it.”
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e4ff] text-sm font-semibold text-[#6d5ce8]">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Feedback that helps</p>
                    <p className="mt-1 text-xs text-[#96918a]">
                      Find your strengths and improve your answers
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#6d5ce8]"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-[#77746f]">
              <div className="flex -space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#faf9f6] bg-[#f2d7c7] text-xs font-semibold text-[#694c3b]">
                  A
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#faf9f6] bg-[#d9e8dc] text-xs font-semibold text-[#41644c]">
                  R
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#faf9f6] bg-[#e5ddff] text-xs font-semibold text-[#5b4bd4]">
                  S
                </span>
              </div>
              <span>Small practice sessions. Real progress.</span>
            </div>
          </section>

          {/* Login form */}
          <section className="mx-auto w-full max-w-[420px]">
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#6d5ce8] lg:hidden">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M6 12.5 10 16l8-8"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#77746f]">
                Sign in to continue your interview preparation.
              </p>
            </div>

            {/* Google login comes first */}
            <div className="flex min-h-[42px] w-full justify-center">
              <GoogleAuthButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                shape="rectangular"
                theme="outline"
                size="large"
                width="360"
              />
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#242321]/[0.1]" />
              <span className="text-xs font-medium text-[#96918a]">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-[#242321]/[0.1]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
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
                  className="h-12 w-full rounded-xl border border-[#242321]/[0.13] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa69f] hover:border-[#242321]/25 focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#6d5ce8] transition hover:text-[#5544cf]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl border border-[#242321]/[0.13] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#aaa69f] hover:border-[#242321]/25 focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#96918a] transition hover:text-[#242321]"
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a14.5 14.5 0 0 1-3.1 3.8M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7a9.9 9.9 0 0 0 3.1-.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M12 8v5m0 3h.01"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5c4bd4] focus:outline-none focus:ring-4 focus:ring-[#6d5ce8]/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#77746f]">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#6d5ce8] transition hover:text-[#5544cf]"
              >
                Sign up for free
              </Link>
            </p>

            <p className="mt-10 text-center text-xs leading-5 text-[#96918a]">
              By continuing, you agree to Prepwise&apos;s{" "}
              <Link to="/terms" className="underline underline-offset-2 hover:text-[#242321]">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-[#242321]">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>

        <footer className="border-t border-[#242321]/[0.08] py-5 text-center text-xs text-[#96918a]">
          © {new Date().getFullYear()} Prepwise. Practice with purpose.
        </footer>
      </div>
    </main>
  );
}
