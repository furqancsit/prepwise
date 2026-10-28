
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    label: "GET STARTED",
    title: "Choose your interview",
    description:
      "Select your target role, interview type, and difficulty. Build a practice session around the job you want.",
    accent: "violet",
    icon: "target",
    details: ["Target role", "Interview type", "Difficulty level"],
  },
  {
    number: "02",
    label: "PRACTICE",
    title: "Answer with confidence",
    description:
      "Work through interview questions at your own pace. Think clearly, structure your answers, and get comfortable.",
    accent: "orange",
    icon: "message",
    details: ["Realistic questions", "Focused sessions", "Your own pace"],
  },
  {
    number: "03",
    label: "IMPROVE",
    title: "Learn from every round",
    description:
      "Review your answers, discover areas to improve, and use each practice session to prepare for the next one.",
    accent: "green",
    icon: "chart",
    details: ["Review your answers", "Identify weak spots", "Track progress"],
  },
];

const styles = {
  violet: {
    number: "bg-violet-100 text-violet-700",
    icon: "bg-violet-100 text-violet-700",
    line: "bg-violet-300",
    dot: "bg-violet-500",
    badge: "border-violet-200 bg-violet-50 text-violet-700",
  },
  orange: {
    number: "bg-orange-100 text-orange-700",
    icon: "bg-orange-100 text-orange-700",
    line: "bg-orange-300",
    dot: "bg-orange-500",
    badge: "border-orange-200 bg-orange-50 text-orange-700",
  },
  green: {
    number: "bg-emerald-100 text-emerald-700",
    icon: "bg-emerald-100 text-emerald-700",
    line: "bg-emerald-300",
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

function StepIcon({ type }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6",
  };

  if (type === "target") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }

  if (type === "message") {
    return (
      <svg {...props}>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8 12h8M8 8.5h5" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 4 3 5-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden border-t border-stone-200/70 bg-[#faf9f6] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-600">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            SIMPLE BY DESIGN
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-stone-900 sm:text-4xl lg:text-5xl">
            From preparation to
            <br className="hidden sm:block" />{" "}
            <span className="text-violet-600">your next opportunity.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg sm:leading-8">
            No complicated setup. No guesswork. Just a simple way
            to prepare, practice, and get better with every interview.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-7 lg:mt-20 lg:gap-12">
          {/* Connector line on desktop */}
          <div className="absolute left-[16.5%] right-[16.5%] top-7 hidden border-t border-dashed border-stone-300 md:block" />

          {steps.map((step) => {
            const color = styles[step.accent];

            return (
              <article key={step.number} className="relative">
                {/* Number and icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#faf9f6] ${color.number}`}
                  >
                    <StepIcon type={step.icon} />
                  </div>

                  <span className="text-xs font-semibold tracking-[0.16em] text-stone-400">
                    STEP {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-7">
                  <span
                    className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-bold tracking-[0.14em] ${color.badge}`}
                  >
                    {step.label}
                  </span>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-500 sm:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Step checklist */}
                <div className="mt-6 space-y-3">
                  {step.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center gap-2.5 text-sm text-stone-600"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${color.icon}`}
                      >
                        <CheckIcon />
                      </span>
                      {detail}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="relative mt-16 overflow-hidden rounded-2xl bg-[#242321] px-6 py-9 sm:px-9 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:px-12 lg:py-10">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[35px] border-violet-400/10" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-medium text-violet-300">
              YOUR NEXT ROUND STARTS HERE
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A little practice goes a long way.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400 sm:text-base">
              Take the first step today. Your future self will thank you.
            </p>
          </div>

          <div className="relative mt-7 lg:mt-0 lg:pl-8">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-violet-50 sm:w-auto"
            >
              Start for free
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
