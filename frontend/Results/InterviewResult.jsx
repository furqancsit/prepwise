
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import api from "./api/axios.js";

function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return minutes > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${remainingSeconds}s`;
}

function FeedbackList({ title, items = [], positive = true }) {
  const Icon = positive ? CheckCircle2 : Target;

  return (
    <div>
      <h4 className="mb-3 font-semibold text-slate-800">
        {title}
      </h4>

      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className="flex items-start gap-2 text-sm leading-6 text-slate-600"
            >
              <Icon
                size={17}
                className={`mt-1 shrink-0 ${
                  positive ? "text-emerald-600" : "text-amber-600"
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">
          No items provided.
        </p>
      )}
    </div>
  );
}

function QuestionCard({ questions, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-semibold text-indigo-700">
            {index + 1}
          </span>

          <div className="min-w-0">
            <p className="font-semibold leading-6 text-slate-800">
              {questions.text}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {questions.topic && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {questions.topic}
                </span>
              )}

              {questions.difficulty && (
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700">
                  {questions.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700">
            {questions.score ?? "—"}/10
          </span>

          {expanded ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
      </button>

      {expanded && (
        <div className="space-y-5 border-t border-slate-100 p-5">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-800">
              Your answer
            </h4>
            <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {questions.answer || "No answer recorded."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Clock3 size={15} />
            <span>
              Answer duration: {formatDuration(questions.durationSeconds)}
            </span>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-slate-800">
              AI feedback
            </h4>
            <p className="text-sm leading-6 text-slate-600">
              {questions.feedback || "No feedback available."}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FeedbackList
              title="What you did well"
              items={questions.strengths}
            />

            <FeedbackList
              title="Areas to improve"
              items={questions.improvements}
              positive={false}
            />
          </div>
        </div>
      )}
    </article>
  );
}

export default function InterviewResult() {
  const { interviewId, sessionId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchResult() {
      setLoading(true);
      setError("");
      setPending(false);
      setResult(null);

      try {
        const response = await api.get(
          `/${interviewId}/session/${sessionId}/result`
        );



        // route : /api/v1/interview/room/:interviewId/session/:sessionId/result

        if (!active) return;

        if (response.data.success && response.data.data) {
          setResult(response.data.data);
        } else {
          setError(
            response.data.message || "Unable to load interview results."
          );
        }
      } catch (err) {
        if (!active) return;

        const status = err.response?.status;
        const message = err.response?.data?.message;

        if (status === 202 || status === 409) {
          setPending(true);
        } else {
          setError(
            message || "Failed to load results. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (interviewId && sessionId) {
      fetchResult();
    } else {
      setError("Interview ID or session ID is missing.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [interviewId, sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-indigo-600"
          />
          <p className="mt-4 font-medium text-slate-600">
            Loading interview results...
          </p>
        </div>
      </div>
    );
  }

  if (pending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Clock3 size={40} className="mx-auto text-amber-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Evaluation in progress
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your interview results are not ready yet. Please check again
            shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Check again
          </button>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <AlertCircle size={40} className="mx-auto text-red-500" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load results
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {error || "No result data was returned."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { score, feedback, questions = [], evaluatedAt } = result;

  const overall = Number(score?.overall);
  const maxScore = Number(score?.maxScore) || 100;
  const percentage = Number.isFinite(overall)
    ? Math.min(100, Math.max(0, (overall / maxScore) * 100))
    : 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Interview completed
            </span>
            {evaluatedAt && (
              <span className="text-sm text-slate-500">
                Evaluated on{" "}
                {new Date(evaluatedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Interview results
          </h1>
          <p className="mt-2 text-slate-600">
            Review your performance and discover how to improve.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-sm md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-indigo-100">
                  Overall score
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    {Number.isFinite(overall) ? overall : "—"}
                  </span>
                  <span className="text-lg text-indigo-200">
                    / {maxScore}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/15 p-3">
                <TrendingUp size={28} />
              </div>
            </div>

            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-indigo-100">
              {score?.performance || "Performance evaluation"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Questions answered
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {questions.filter((q) => q.answer?.trim()).length}
              <span className="text-lg font-medium text-slate-400">
                {" "}/ {questions.length}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {questions.length} questions in this session
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Target size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Overall feedback
            </h2>
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            {feedback?.summary || "No overall summary is available."}
          </p>

          <div className="mt-7 grid gap-8 md:grid-cols-2">
            <FeedbackList
              title="Your strengths"
              items={feedback?.strengths}
            />
            <FeedbackList
              title="Areas for improvement"
              items={feedback?.improvements}
              positive={false}
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Question-by-question review
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review your answers and the feedback for each question.
              </p>
            </div>

            <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
              {questions.length} questions
            </span>
          </div>

          {questions.length ? (
            <div className="space-y-4">
              {questions.map((questions, index) => (
                <QuestionCard
                  key={questions.questionId}
                  questions={questions}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No questions were returned for this interview.
            </div>
          )}
        </section>

        
      </div>
    </main>
  );
}
