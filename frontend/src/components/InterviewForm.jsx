import { useEffect, useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

const initialForm = {
  title: "",
  role: "",
  experienceLevel: "Fresher",
  topics: [],
  difficulty: "Medium",
  questionCount: 10,
  durationMinutes: 30,
  interviewType: "Technical",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

const labelClass = "text-sm font-medium text-zinc-300";

export default function InterviewForm({
  initialData,
  onSubmit,
  onClose,
  saving,
}) {
  const [form, setForm] = useState(initialForm);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialForm,
        ...initialData,
        topics: Array.isArray(initialData.topics)
          ? initialData.topics
          : [],
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: ["questionCount", "durationMinutes"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const addTopic = () => {
    const value = topic.trim();

    if (
      value &&
      !form.topics.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setForm((previous) => ({
        ...previous,
        topics: [...previous.topics, value],
      }));
    }

    setTopic("");
  };

  const removeTopic = (value) => {
    setForm((previous) => ({
      ...previous,
      topics: previous.topics.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.role.trim()) {
      setError("Please enter an interview title and role.");
      return;
    }

    if (form.questionCount < 1 || form.durationMinutes < 1) {
      setError("Questions and duration must be at least 1.");
      return;
    }

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        role: form.role.trim(),
      });
    } catch (err) {
      setError(err.message || "Unable to save interview.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-violet-400">
              <Sparkles size={18} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Interview Studio
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">
              {initialData ? "Edit interview" : "Create interview"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Customize your next practice session.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {error && (
            <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div>
            <label className={labelClass}>Interview title *</label>
            <input
              className={inputClass}
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="e.g. Frontend Developer Mock Interview"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Job role *</label>
            <input
              className={inputClass}
              name="role"
              value={form.role}
              onChange={updateField}
              placeholder="e.g. React Developer"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Experience level</label>
              <select
                className={inputClass}
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={updateField}
              >
                {["Fresher", "Entry Level", "Junior", "Mid Level", "Senior", "Lead"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Difficulty</label>
              <select
                className={inputClass}
                name="difficulty"
                value={form.difficulty}
                onChange={updateField}
              >
                {["Easy", "Medium", "Hard"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Interview type</label>
              <select
                className={inputClass}
                name="interviewType"
                value={form.interviewType}
                onChange={updateField}
              >
                {["Technical", "Behavioral", "HR", "Mixed", "System Design"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Number of questions</label>
              <input
                className={inputClass}
                type="number"
                min="1"
                max="100"
                name="questionCount"
                value={form.questionCount}
                onChange={updateField}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Duration (minutes)</label>
              <input
                className={inputClass}
                type="number"
                min="1"
                max="300"
                name="durationMinutes"
                value={form.durationMinutes}
                onChange={updateField}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Topics</label>
            <div className="mt-2 flex gap-2">
              <input
                className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-violet-500"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTopic();
                  }
                }}
                placeholder="e.g. JavaScript, React, APIs"
              />
              <button
                type="button"
                onClick={addTopic}
                className="rounded-xl bg-zinc-800 px-4 text-white hover:bg-zinc-700"
                aria-label="Add topic"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.topics.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeTopic(item)}
                    aria-label={`Remove ${item}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              {saving ? "Saving..." : initialData ? "Save changes" : "Create interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}