import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CircleHelp,
  Clock3,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Sparkles,
  FileQuestion,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

// Update these import paths to match your project.
// import { interviewApi } from "../services/interviewApi";
// import { getApiError } from "../utils/getApiError";

import { getApiError } from "../api/interviewApi";
import { interviewApi } from "../api/interviewApi";

const INITIAL_FORM = {
  title: "",
  role: "",
  experienceLevel: "Entry level",
  questionCount: 10,
  durationMinutes: 30,
};

const EXPERIENCE_LEVELS = [
  "Entry level",
  "Junior",
  "Mid level",
  "Senior",
  "Lead",
];

const formatDate = (date) => {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const dashboard = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadInterviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await interviewApi.getAll();
      setInterviews(response.data || []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const filteredInterviews = useMemo(() => {
    const term = search.trim().toLowerCase();

    return interviews.filter((item) =>
      [item.title, item.role, item.experienceLevel]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [interviews, search]);

  const openEdit = (interview) => {
    setEditing(interview);
    setFormOpen(true);
  };

  const handleSave = async (payload) => {
    setSaving(true);

    try {
      if (editing) {
        await interviewApi.update(editing._id, payload);
      } else {
        await interviewApi.create(payload);
      }

      setFormOpen(false);
      setEditing(null);
      await loadInterviews();
    } catch (err) {
      throw new Error(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (interview) => {
    const confirmed = window.confirm(
      `Archive "${interview.title}"? It will be removed from your active interviews.`,
    );

    if (!confirmed) return;

    try {
      await interviewApi.remove(interview._id);
      setInterviews((previous) =>
        previous.filter((item) => item._id !== interview._id),
      );
    } catch (err) {
      setError(getApiError(err));
    }
  };

  const stats = [
    {
      label: "Total interviews",
      value: interviews.length,
      icon: BriefcaseBusiness,
      detail: "Interview setups created",
      iconStyle: "bg-[#eeeaff] text-[#6d5ce8]",
    },
    {
      label: "Total questions",
      value: interviews.reduce(
        (sum, item) => sum + (Number(item.questionCount) || 0),
        0,
      ),
      icon: CircleHelp,
      detail: "Across all interviews",
      iconStyle: "bg-[#e8f3e9] text-[#477b52]",
    },
    {
      label: "Practice time",
      value: `${interviews.reduce(
        (sum, item) => sum + (Number(item.durationMinutes) || 0),
        0,
      )} min`,
      icon: Clock3,
      detail: "Planned session duration",
      iconStyle: "bg-[#fff0df] text-[#a7682b]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#242321]">
      <main className="mx-auto max-w-7xl px-4 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6d5ce8]/15 bg-[#6d5ce8]/[0.06] px-3 py-1.5 text-xs font-medium text-[#6d5ce8]">
              <Sparkles size={14} />
              Your interview workspace
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Interview dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#77746f] sm:text-base">
              Build your practice sessions and get ready for what’s next.
            </p>
          </div>

          <Link
            to="/create-interview"
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#6d5ce8] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5c4bd4] focus:outline-none focus:ring-4 focus:ring-[#6d5ce8]/20 sm:self-auto"
          >
            <Plus size={18} />
            Create interview
          </Link>
        </div>

        {/* Stats */}
        <section
          aria-label="Interview statistics"
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#77746f]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#96918a]">{stat.detail}</p>
              </div>
            );
          })}
        </section>

        {/* Interview list header */}
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Your interviews
              </h2>
              <p className="mt-1 text-sm text-[#77746f]">
                Manage your interview setups in one place.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#96918a]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search interviews..."
                aria-label="Search interviews"
                className="h-11 w-full rounded-xl border border-[#242321]/10 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10"
              />
            </div>
          </div>

          {/* API error */}
          {error && (
            <div
              role="alert"
              className="mt-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <button
                onClick={loadInterviews}
                className="inline-flex items-center gap-2 self-start font-semibold hover:underline sm:self-auto"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-[#242321]/[0.08] bg-white p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#f0eeea]" />
                  <div className="mt-5 h-4 w-2/3 rounded bg-[#f0eeea]" />
                  <div className="mt-3 h-3 w-1/2 rounded bg-[#f0eeea]" />
                  <div className="mt-8 h-16 rounded-xl bg-[#f7f6f3]" />
                </div>
              ))}
            </div>
          ) : filteredInterviews.length === 0 ? (
            /* Empty state */
            <div className="mt-6 rounded-2xl border border-dashed border-[#242321]/15 bg-white px-6 py-14 text-center sm:py-16">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#6d5ce8]">
                {search ? <Search size={24} /> : <FileQuestion size={25} />}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {search
                  ? "No interviews found"
                  : "Your next interview starts here"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77746f]">
                {search
                  ? "Try another search term or clear your search to see your interviews."
                  : "Create your first interview setup and start preparing for your next opportunity."}
              </p>

              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="mt-5 text-sm font-semibold text-[#6d5ce8] hover:underline"
                >
                  Clear search
                </button>
              ) : (
                <Link
                to="/create-interview"
                 
                  className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#6d5ce8] px-4 text-sm font-semibold text-white transition hover:bg-[#5c4bd4]"
                >
                  <Plus size={17} />
                  Create your first interview
                </Link>
              )}
            </div>
          ) : (
            /* Interview cards */
            <>
              <div className="mt-5 flex items-center justify-between text-xs text-[#96918a]">
                <span>
                  Showing {filteredInterviews.length}{" "}
                  {filteredInterviews.length === 1 ? "interview" : "interviews"}
                </span>
              </div>

              <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredInterviews.map((interview) => {
                  const session = interview.latestSession;

                  const isCompleted = session?.status === "completed";
                  const isInProgress = session?.status === "in_progress";

                  const destination = isCompleted
                    ? `/interview/${interview._id}/session/${session._id}/result`
                    : `/interviews/${interview._id}/`;

                  const buttonLabel = isCompleted
                    ? "View results"
                    : isInProgress
                      ? "Continue interview"
                      : "Start interview";

                  return (
                    <article
                      key={interview._id}
                      className="group flex min-w-0 flex-col rounded-2xl border border-[#242321]/[0.08] bg-white p-5 transition duration-200 hover:border-[#6d5ce8]/30 hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeeaff] text-[#6d5ce8]">
                          <BriefcaseBusiness size={20} />
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(interview)}
                            aria-label={`Edit ${interview.title}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#77746f] hover:bg-[#f4f2ff] hover:text-[#6d5ce8]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(interview)}
                            aria-label={`Delete ${interview.title}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#96918a] hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <Link
                        to={destination}
                        className="mt-5 block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5ce8]"
                      >
                        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[#6d5ce8]">
                          {interview.title || "Untitled interview"}
                        </h3>

                        <p className="mt-1 text-sm text-[#77746f]">
                          {interview.role || "Role not specified"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-lg bg-[#f5f4f1] px-2.5 py-1.5 text-xs font-medium capitalize text-[#625f59]">
                            {interview.experienceLevel || "All levels"}
                          </span>

                          <span
                            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                              isCompleted
                                ? "bg-emerald-50 text-emerald-700"
                                : isInProgress
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-[#f0edff] text-[#6d5ce8]"
                            }`}
                          >
                            {isCompleted
                              ? "Completed"
                              : isInProgress
                                ? "In progress"
                                : "Not started"}
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-[#faf9f6] p-3.5">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-[#77746f]">
                              <CircleHelp size={14} />
                              Questions
                            </div>
                            <p className="mt-1.5 text-sm font-semibold">
                              {Number(interview.questionCount) || 0}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-[#77746f]">
                              <Clock3 size={14} />
                              Duration
                            </div>
                            <p className="mt-1.5 text-sm font-semibold">
                              {Number(interview.durationMinutes) || 0} min
                            </p>
                          </div>
                        </div>
                      </Link>

                      <Link
                        to={destination}
                        className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-4 text-sm font-semibold text-white transition hover:bg-[#5c4bd0]"
                      >
                        {buttonLabel}
                        <ArrowUpRight size={16} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      {formOpen && (
        <InterviewFormModal
          key={editing?._id || "new-interview"}
          initialData={editing}
          saving={saving}
          onClose={() => {
            if (saving) return;
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

function InterviewFormModal({ initialData, saving, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    ...(initialData || {}),
  }));
  const [formError, setFormError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setForm((previous) => ({ ...previous, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const payload = {
      title: form.title.trim(),
      role: form.role.trim(),
      experienceLevel: form.experienceLevel,
      questionCount: Number(form.questionCount),
      durationMinutes: Number(form.durationMinutes),
    };

    if (!payload.title || !payload.role) {
      setFormError("Please enter an interview title and role.");
      return;
    }

    if (
      !Number.isFinite(payload.questionCount) ||
      payload.questionCount < 1 ||
      !Number.isFinite(payload.durationMinutes) ||
      payload.durationMinutes < 1
    ) {
      setFormError("Questions and duration must be at least 1.");
      return;
    }

    try {
      await onSave(payload);
    } catch (err) {
      setFormError(err.message || "Unable to save interview.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#242321]/40 p-4 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-form-title"
        className="my-auto w-full max-w-lg rounded-2xl border border-[#242321]/10 bg-[#faf9f6] p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="interview-form-title"
              className="text-xl font-semibold tracking-tight"
            >
              {initialData ? "Edit interview" : "Create an interview"}
            </h2>
            <p className="mt-1 text-sm text-[#77746f]">
              Customize your practice session.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#77746f] transition hover:bg-white hover:text-[#242321] disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
              Interview title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer Mock Interview"
              required
              maxLength={120}
              disabled={saving}
              className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
              Target role
            </label>
            <input
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
              maxLength={120}
              disabled={saving}
              className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="experienceLevel"
              className="mb-1.5 block text-sm font-medium"
            >
              Experience level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="questionCount"
                className="mb-1.5 block text-sm font-medium"
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
                disabled={saving}
                className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="durationMinutes"
                className="mb-1.5 block text-sm font-medium"
              >
                Duration (min)
              </label>
              <input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min="1"
                max="240"
                value={form.durationMinutes}
                onChange={handleChange}
                required
                disabled={saving}
                className="h-11 w-full rounded-xl border border-[#242321]/15 bg-white px-3.5 text-sm outline-none transition focus:border-[#6d5ce8] focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />
            </div>
          </div>

          {formError && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
            >
              {formError}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-11 rounded-xl border border-[#242321]/10 bg-white px-4 text-sm font-semibold transition hover:bg-[#f5f4f1] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-5 text-sm font-semibold text-white transition hover:bg-[#5c4bd4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <RefreshCw size={15} className="animate-spin" />}
              {saving
                ? "Saving..."
                : initialData
                  ? "Save changes"
                  : "Create interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default dashboard;
