import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, CircleHelp, Code2 } from "lucide-react";
import { interviewApi, getApiError } from "../api/interviewApi";

export default function InterviewDetails() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const response = await interviewApi.getById(id);
        if (!cancelled) setInterview(response.data);
      } catch (err) {
        if (!cancelled) setError(getApiError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-zinc-300">
        Loading interview...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={17} /> Back to dashboard
        </Link>

        {error ? (
          <div role="alert" className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
          </div>
        ) : interview ? (
          <>
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Code2 size={24} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-violet-400">
                {interview.interviewType || "Interview"}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                {interview.title}
              </h1>
              <p className="mt-2 text-zinc-400">{interview.role}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm text-zinc-500">Experience</p>
                  <p className="mt-2 font-semibold">{interview.experienceLevel}</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm text-zinc-500">Difficulty</p>
                  <p className="mt-2 font-semibold">{interview.difficulty || "Not specified"}</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <CircleHelp size={18} className="text-violet-400" />
                  <p className="mt-3 text-sm text-zinc-500">Question count</p>
                  <p className="mt-1 text-xl font-bold">
                    {interview.questionCount ?? 0}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <Clock3 size={18} className="text-violet-400" />
                  <p className="mt-3 text-sm text-zinc-500">Duration</p>
                  <p className="mt-1 text-xl font-bold">
                    {interview.durationMinutes ?? 0} minutes
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="font-semibold text-white">Topics to cover</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interview.topics?.length ? (
                    interview.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-300"
                      >
                        {topic}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No topics added.</p>
                  )}
                </div>
              </div>

              <p className="mt-8 border-t border-zinc-800 pt-5 text-xs text-zinc-500">
                Interview ID: {interview._id}
              </p>
            </div>
          </>
        ) : (
          <p className="mt-8 text-zinc-400">Interview not found.</p>
        )}
      </div>
    </main>
  );
}