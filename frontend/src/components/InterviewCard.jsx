import {
  Clock3,
  Code2,
  Ellipsis,
  Pencil,
  Trash2,
  Eye,
  CircleHelp,
} from "lucide-react";
import { useState } from "react";

export default function InterviewCard({
  interview,
  onView,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-violet-500/40 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
          <Code2 size={21} />
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="Interview actions"
          >
            <Ellipsis size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-10 w-40 rounded-xl border border-zinc-700 bg-zinc-950 p-1 shadow-xl">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onView(interview._id);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                <Eye size={15} /> View
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(interview);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                <Pencil size={15} /> Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(interview);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={15} /> Archive
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-5 truncate text-lg font-semibold text-white">
        {interview.title}
      </h3>
      <p className="mt-1 text-sm text-zinc-400">{interview.role}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
          {interview.experienceLevel}
        </span>
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300">
          {interview.difficulty || "Medium"}
        </span>
      </div>

      {interview.topics?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {interview.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
            >
              {topic}
            </span>
          ))}
          {interview.topics.length > 3 && (
            <span className="px-1 py-1 text-xs text-zinc-500">
              +{interview.topics.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <CircleHelp size={15} />
          {interview.questionCount ?? 10} questions
        </span>
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} />
          {interview.durationMinutes ?? 30} min
        </span>
      </div>

      <button
        onClick={() => onView(interview._id)}
        className="mt-5 w-full rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-white transition hover:border-violet-500/50 hover:bg-violet-500/10"
      >
        View interview
      </button>
    </article>
  );
}