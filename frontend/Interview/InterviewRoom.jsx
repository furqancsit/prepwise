import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {

  ArrowRight,
 
  CheckCircle2,
  Clock3,
  FileQuestion,
  Lightbulb,
  LoaderCircle,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";

export default function InterviewRoom() {
  const { interviewId } = useParams();

  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  const startInterview = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `/api/v1/interview/room/${interviewId}/start`,
      );

      const result = response.data.data;

      if (!result) {
        throw new Error("Invalid response from the server.");
      }

      setInterview(result);
      setSessionId(result.sessionId);
      setQuestions(result.questions || []);
      setCurrentIndex(0);
      setAnswerText("");

      if (result.questions?.length > 0) {
        setStarted(true);
        setCompleted(false);
      } else {
        setStarted(false);
        setCompleted(true);
        setError("No questions are available for this interview.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to start the interview.",
      );
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (event) => {
    event.preventDefault();

    if (!currentQuestion || !answerText.trim() || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const answerResponse = await axios.post(
        `/api/v1/interview/room/${interviewId}/session/${sessionId}/question/${currentQuestion.order}/answer`,
        {
          answerText: answerText.trim(),
        },
      );
     

      setAnswerText("");

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((index) => index + 1);
      } else {
        const completionResponse = await axios.post(
          `/api/v1/interview/room/${interviewId}/session/${sessionId}/complete`,
        );

        console.log("Interview completed:", completionResponse.data);

        navigate(`/interview/${interviewId}/session/${sessionId}/result`);
      }
    } catch (err) {
      console.error("Interview submission error:", err.response?.data || err);

      setError(err.response?.data?.message || "Unable to submit your answer.");
    } finally {
      setSubmitting(false);
    }
  };
  const progress = questions.length
    ? Math.round(
        ((completed ? questions.length : currentIndex) / questions.length) *
          100,
      )
    : 0;

  const questionText =
    currentQuestion?.questionText ||
    currentQuestion?.question ||
    currentQuestion?.text ||
    "Read the question carefully and explain your approach.";

  // Start screen
  if (!started && !completed) {
    return (
      <main className="min-h-screen bg-[#faf9f6] text-[#242321]">
        <div className="mx-auto grid min-h-[calc(100vh-69px)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6d5ce8]/15 bg-[#6d5ce8]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#6d5ce8]">
              <Sparkles size={14} />
              Your practice starts here
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.12] tracking-[-0.05em] sm:text-5xl">
              Your next interview.
              <span className="block text-[#6d5ce8]">Your next big step.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#77746f]">
              Take a breath, focus on one question at a time, and show what you
              know. This is your space to practice and improve.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 flex gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <XCircle size={18} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={startInterview}
              disabled={loading}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5c4bd4] focus:outline-none focus:ring-4 focus:ring-[#6d5ce8]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Preparing your interview...
                </>
              ) : (
                <>
                  Start interview
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#77746f]">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#6d5ce8]" />
                Your own practice space
              </span>
              <span className="inline-flex items-center gap-2">
                <Target size={16} className="text-[#6d5ce8]" />
                One question at a time
              </span>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-4 top-0 h-32 w-32 rounded-full bg-[#e9e4ff] blur-3xl" />
            <div className="absolute -bottom-4 left-0 h-32 w-32 rounded-full bg-[#f5dfc8] blur-3xl" />

            <div className="relative rounded-2xl border border-[#242321]/[0.08] bg-white p-6 shadow-[0_24px_70px_-40px_rgba(36,35,33,0.28)] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eeeaff] text-[#6d5ce8]">
                <MessageSquare size={23} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#96918a]">
                A little reminder
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
                You don’t need perfect answers. You need thoughtful ones.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#77746f]">
                Take your time to organize your thoughts and answer in your own
                words.
              </p>

              <div className="mt-7 rounded-xl bg-[#faf9f6] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#6d5ce8]">
                    <Lightbulb size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Think it through</p>
                    <p className="mt-1 text-xs leading-5 text-[#77746f]">
                      Explain your reasoning, include relevant examples, and
                      keep your answer focused.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Empty or completed session
  if (completed && !started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5 py-10 text-[#242321]">
        <section className="w-full max-w-md rounded-2xl border border-[#242321]/[0.08] bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#6d5ce8]">
            <CheckCircle2 size={28} />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            No questions available yet
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#77746f]">
            This interview doesn’t have any questions to practice. Return to
            your dashboard and try another interview.
          </p>
          <Link
            to="/dash"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-5 text-sm font-semibold text-white transition hover:bg-[#5c4bd4]"
          >
            Back to dashboard
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }
  // Active interview room
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#242321]">
      {/* Top bar */}
      <header className="sticky top-0 ">
        <div className="mx-auto flex h-17  max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 ">
          <div className="text-left">
            <p className="truncate text-sm font-semibold">
              {interview?.title || "Interview in progress"}
            </p>
            <p className="mt-0.5 text-xs text-[#77746f]">
              {interview?.role || "Practice session"}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-[#77746f] transition hover:bg-white hover:text-[#242321] sm:px-3"
          >
            <XCircle size={17} />
            <span className="hidden sm:inline">Exit room</span>
          </Link>
        </div>

        <div className="h-1 w-full bg-[#242321]/[0.05]">
          <div
            className="h-full bg-[#6d5ce8] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-12 sm:px-6 sm:py-12">
        {/* Progress heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6d5ce8]">
              <span className="h-2 w-2 rounded-full bg-[#6d5ce8] pt-12" />
              Interview session
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Focus on your answer.
            </h1>
            <p className="mt-2 text-sm text-[#77746f]">
              Take your time. Answer clearly and use examples when you can.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#242321]/[0.08] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeaff] text-[#6d5ce8]">
              <FileQuestion size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <p className="mt-0.5 text-xs text-[#77746f]">
                {questions.length - currentIndex} remaining, including this one
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          {/* Question and answer */}
          <section className="min-w-0 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-[#242321]/[0.08] bg-white">
              <div className="flex items-center justify-between border-b border-[#242321]/[0.07] px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eeeaff] text-[#6d5ce8]">
                    <MessageSquare size={17} />
                  </span>
                  Interview question
                </div>
                <span className="rounded-lg bg-[#f5f4f1] px-2.5 py-1.5 text-xs font-medium capitalize text-[#625f59]">
                  {interview?.difficulty || "Practice"}
                </span>
              </div>

              <div className="p-5 sm:p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#96918a]">
                  Question {currentIndex + 1}
                </p>

                <h2 className="whitespace-pre-wrap break-words text-xl font-semibold leading-relaxed tracking-[-0.025em] sm:text-2xl">
                  {questionText}
                </h2>

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#f7f5ff] p-4">
                  <Lightbulb
                    size={18}
                    className="mt-0.5 shrink-0 text-[#6d5ce8]"
                  />
                  <p className="text-sm leading-6 text-[#6256a6]">
                    Structure your response, explain your thinking, and use a
                    specific example where relevant.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={submitAnswer}
              className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5 sm:p-7"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold">Your answer</h2>
                  <p className="mt-1 text-sm text-[#77746f]">
                    Write your response below.
                  </p>
                </div>
                <span className="text-xs text-[#96918a]">
                  {answerText.length} characters
                </span>
              </div>

              <textarea
                value={answerText}
                onChange={(event) => {
                  setAnswerText(event.target.value);
                  if (error) setError("");
                }}
                placeholder="Start writing your answer here..."
                rows={9}
                disabled={submitting}
                className="mt-5 w-full resize-y rounded-xl border border-[#242321]/10 bg-[#faf9f6] p-4 text-sm leading-7 outline-none transition placeholder:text-[#aaa69f] focus:border-[#6d5ce8] focus:bg-white focus:ring-4 focus:ring-[#6d5ce8]/10 disabled:opacity-60"
              />

              {error && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 border-t border-[#242321]/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#96918a]">
                  Your answer will be submitted when you continue.
                </p>

                <button
                  type="submit"
                  disabled={submitting || !answerText.trim()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-5 text-sm font-semibold text-white transition hover:bg-[#5c4bd4] focus:outline-none focus:ring-4 focus:ring-[#6d5ce8]/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Submitting...
                    </>
                  ) : currentIndex === questions.length - 1 ? (
                    <>
                      Finish interview
                      <CheckCircle2 size={17} />
                    </>
                  ) : (
                    <>
                      Submit & continue
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28">
            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5">
              <h2 className="text-sm font-semibold">Your progress</h2>

              <div className="mt-5 flex items-end justify-between">
                <p className="text-3xl font-semibold tracking-tight">
                  {progress}%
                </p>
                <p className="pb-1 text-xs text-[#77746f]">
                  of questions viewed
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f0eeea]">
                <div
                  className="h-full rounded-full bg-[#6d5ce8] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#faf9f6] p-3">
                  <p className="text-xs text-[#77746f]">Completed</p>
                  <p className="mt-1 text-lg font-semibold">{currentIndex}</p>
                </div>
                <div className="rounded-xl bg-[#faf9f6] p-3">
                  <p className="text-xs text-[#77746f]">Remaining</p>
                  <p className="mt-1 text-lg font-semibold">
                    {questions.length - currentIndex}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#242321]/[0.08] bg-white p-5">
              <h2 className="text-sm font-semibold">Session details</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeaff] text-[#6d5ce8]">
                    <Target size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#77746f]">Target role</p>
                    <p className="mt-1 break-words text-sm font-medium">
                      {interview?.role || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3e9] text-[#477b52]">
                    <Clock3 size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-[#77746f]">Planned duration</p>
                    <p className="mt-1 text-sm font-medium">
                      {interview?.durationMinutes
                        ? `${interview.durationMinutes} minutes`
                        : "Self-paced"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0df] text-[#a7682b]">
                    <FileQuestion size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-[#77746f]">Question count</p>
                    <p className="mt-1 text-sm font-medium">
                      {questions.length} questions
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="rounded-2xl border border-[#6d5ce8]/15 bg-[#f2efff] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#5c4bd4]">
                <Sparkles size={17} />
                Keep going
              </div>
              <p className="mt-2 text-sm leading-6 text-[#6256a6]">
                Focus on giving your best answer to the current question. You
                can take it one step at a time.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-[#96918a]">
          <ShieldCheck size={15} />
          Stay focused. Your practice session is underway.
        </footer>
      </div>
    </main>
  );
}
