import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  FileQuestion,
  Lightbulb,
  LoaderCircle,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";
import UpgradePlanButton from "../components/UpgradePlanButton";

const initialForm = {
  title: "",
  role: "",
  experienceLevel: "junior",
  topics: "",
  difficulty: "medium",
  questionCount: 10 ,
  durationMinutes: 30,
  interviewType: "technical",
};

const interviewTypes = [
  {
    value: "technical",
    label: "Technical",
    description: "Coding, concepts & problem-solving",
    icon: Code2,
  },
  {
    value: "behavioral",
    label: "Behavioral",
    description: "Experience, teamwork & situations",
    icon: MessageSquare,
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "Technical and behavioral questions",
    icon: Sparkles,
  },
];

const difficulties = [
  { value: "easy", label: "Easy", description: "Build confidence" },
  { value: "medium", label: "Medium", description: "Balanced practice" },
  { value: "hard", label: "Hard", description: "Challenge yourself" },
];

const experienceLevels = [
  { value: "fresher", label: "Fresher" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
];

const CreateInterview = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [limitReached, setLimitReached] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "questionCount" || name === "durationMinutes"
          ? Number(value)
          : value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLimitReached(false);

    if (!form.title.trim() || !form.role.trim()) {
      setError("Please enter an interview title and role.");
      return;
    }

    if (
      form.questionCount < 1 ||
      form.questionCount > 100 ||
      form.durationMinutes < 1 ||
      form.durationMinutes > 240
    ) {
      setError("Choose 1–100 questions and a duration of 1–240 minutes.");
      return;
    }

    const payload = {
      ...form,
      title: form.title.trim(),
      role: form.role.trim(),
      topics: form.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter(Boolean),
    };

    try {
      setLoading(true);

      const response = await axios.post("/api/v1/interview/", payload);
      const interview = response.data.data;
      const interviewId = interview?._id;

      setSuccess("Interview created successfully!");

      if (interviewId) {
        navigate(`/interviews/${interviewId}`);
      }
    } catch (err) {
      const status = err.response?.status;
      const code = err.response?.data?.code;
      const message = err.response?.data?.message;

      if (status === 403 && code === "INTERVIEW_LIMIT_REACHED") {
        setLimitReached(true);
        setError(message || "You have reached your interview limit.");
      } else if (status === 401) {
        setError("Please log in to continue.");
      } else {
        setError(message || "Could not create interview. Please try again.");
      }

      setError(
        err.response?.data?.message ||
          "Could not create interview. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedType =
    interviewTypes.find((type) => type.value === form.interviewType) ||
    interviewTypes[0];

  const selectedDifficulty =
    difficulties.find((item) => item.value === form.difficulty) ||
    difficulties[1];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#242321]">
      {/* Top navigation */}

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8  lg:px-12 lg:pb-28 ">
        {/* Heading */}
        <div className="">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6d5ce8]/15 bg-[#6d5ce8]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#6d5ce8]">
            <Sparkles size={14} />
            YOUR NEXT STEP
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl ">
            Create an interview
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#77746f] sm:text-base">
            Personalize your practice session to match the role you’re preparing
            for.
          </p>

         
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
        >
          {/* Form column */}
          <div className="min-w-0 space-y-6">
            {/* Basic information */}
            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eeeaff] text-[#6d5ce8]">
                  <BriefcaseBusiness size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">Basic information</h2>
                  <p className="mt-1 text-sm text-[#77746f]">
                    Give your interview a name and target role.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium"
                  >
                    Interview title <span className="text-[#6d5ce8]">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer Practice"
                    maxLength={120}
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="role"
                      className="mb-2 block text-sm font-medium"
                    >
                      Target role <span className="text-[#6d5ce8]">*</span>
                    </label>
                    <input
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer"
                      maxLength={120}
                      required
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experienceLevel"
                      className="mb-2 block text-sm font-medium"
                    >
                      Experience level
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={form.experienceLevel}
                      onChange={handleChange}
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Interview type */}
            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-7">
              <div className="mb-5">
                <h2 className="font-semibold">Interview type</h2>
                <p className="mt-1 text-sm text-[#77746f]">
                  Choose the kind of questions you want to practice.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {interviewTypes.map((type) => {
                  const Icon = type.icon;
                  const active = form.interviewType === type.value;

                  return (
                    <label
                      key={type.value}
                      className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition ${
                        active
                          ? "border-[#6d5ce8] bg-[#f7f5ff] ring-2 ring-[#6d5ce8]/10"
                          : "border-[#242321]/10 bg-white hover:border-[#6d5ce8]/35"
                      }`}
                    >
                      <input
                        type="radio"
                        name="interviewType"
                        value={type.value}
                        checked={active}
                        onChange={handleChange}
                        disabled={loading}
                        className="sr-only"
                      />

                      <div className="flex items-center justify-between">
                        <Icon
                          size={21}
                          className={
                            active ? "text-[#6d5ce8]" : "text-[#77746f]"
                          }
                        />
                        {active && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6d5ce8] text-white">
                            <Check size={12} />
                          </span>
                        )}
                      </div>

                      <span className="mt-4 text-sm font-semibold">
                        {type.label}
                      </span>
                      <span className="mt-1 text-xs leading-5 text-[#77746f]">
                        {type.description}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Topics and difficulty */}
            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f3e9] text-[#477b52]">
                  <Target size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">Focus areas</h2>
                  <p className="mt-1 text-sm text-[#77746f]">
                    Tailor the difficulty and topics to your goals.
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Difficulty level
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {difficulties.map((item) => {
                    const active = form.difficulty === item.value;

                    return (
                      <label
                        key={item.value}
                        className={`flex cursor-pointer flex-col items-center rounded-xl border px-2 py-3.5 text-center transition sm:px-4 ${
                          active
                            ? "border-[#6d5ce8] bg-[#f7f5ff] text-[#6d5ce8]"
                            : "border-[#242321]/10 hover:border-[#6d5ce8]/35"
                        }`}
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={item.value}
                          checked={active}
                          onChange={handleChange}
                          disabled={loading}
                          className="sr-only"
                        />
                        <span className="text-sm font-semibold">
                          {item.label}
                        </span>
                        <span className="mt-1 text-[11px] leading-4 text-[#77746f] sm:text-xs">
                          {item.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="topics"
                  className="mb-2 block text-sm font-medium"
                >
                  Topics to cover{" "}
                  <span className="font-normal text-[#96918a]">(optional)</span>
                </label>
                <input
                  id="topics"
                  name="topics"
                  value={form.topics}
                  onChange={handleChange}
                  placeholder="React, JavaScript, APIs, problem-solving"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                />
                <p className="mt-2 text-xs text-[#96918a]">
                  Separate topics with commas.
                </p>
              </div>
            </section>

            {/* Session settings */}
            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0df] text-[#a7682b]">
                  <Clock3 size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">Session settings</h2>
                  <p className="mt-1 text-sm text-[#77746f]">
                    Set a practice length that works for you.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="questionCount"
                    className="mb-2 block text-sm font-medium"
                  >
                    Number of questions
                  </label>
                  <input
                    id="questionCount"
                    name="questionCount"
                    type="number"
                    min="1"
                    max="100"
                    value={form.questionCount}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="durationMinutes"
                    className="mb-2 block text-sm font-medium"
                  >
                    Duration (minutes)
                  </label>
                  <input
                    id="durationMinutes"
                    name="durationMinutes"
                    type="number"
                    min="5"
                    max="240"
                    step="5"
                    value={form.durationMinutes}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-[#242321]/15 bg-white px-4 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
                  />
                </div>
              </div>
            </section>

          

            {/* Feedback */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
             <div className="text-left">
               {limitReached && <UpgradePlanButton />}
             </div>

            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {success}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pb-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/dash")}
                disabled={loading}
                className="h-12 rounded-xl border border-[#242321]/10 bg-white px-5 text-sm font-semibold transition hover:bg-[#f5f4f1] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5c4bd4] focus:outline-none focus:ring-4 focus:ring-[#6d5ce8]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Creating interview...
                  </>
                ) : (
                  <>
                    Create interview
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live summary */}
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-[#242321]/[0.08] bg-white">
              <div className="bg-[#242321] p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <Sparkles size={16} />
                  YOUR SETUP
                </div>
                <h2 className="mt-4 break-words text-xl font-semibold tracking-tight">
                  {form.title.trim() || "Your interview"}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  {form.role.trim() || "Your target role"}
                </p>
              </div>

              <div className="space-y-5 p-5">
                <SummaryRow label="Interview type" value={selectedType.label} />
                <SummaryRow
                  label="Experience"
                  value={
                    experienceLevels.find(
                      (level) => level.value === form.experienceLevel,
                    )?.label || form.experienceLevel
                  }
                />
                <SummaryRow
                  label="Difficulty"
                  value={selectedDifficulty.label}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#faf9f6] p-3.5">
                    <FileQuestion size={17} className="text-[#6d5ce8]" />
                    <p className="mt-3 text-xl font-semibold">
                      {form.questionCount || 0}
                    </p>
                    <p className="mt-1 text-xs text-[#77746f]">Questions</p>
                  </div>
                  <div className="rounded-xl bg-[#faf9f6] p-3.5">
                    <Clock3 size={17} className="text-[#6d5ce8]" />
                    <p className="mt-3 text-xl font-semibold">
                      {form.durationMinutes || 0}
                    </p>
                    <p className="mt-1 text-xs text-[#77746f]">Minutes</p>
                  </div>
                </div>

                <div className="border-t border-[#242321]/[0.08] pt-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Lightbulb size={16} className="text-[#a7682b]" />
                    Quick tip
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#77746f]">
                    Choose focused topics and a realistic time limit to make
                    each practice session more useful.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-[#96918a]">
              You can update your interview setup later.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
};

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#77746f]">{label}</span>
      <span className="text-right text-sm font-semibold capitalize">
        {value}
      </span>
    </div>
  );
}

export default CreateInterview;
