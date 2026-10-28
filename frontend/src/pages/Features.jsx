
import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    title: "Practice with purpose",
    description:
      "Prepare for real-world interview questions tailored to your target role, experience, and technical skills.",
    icon: "target",
    theme: "violet",
    className: "md:col-span-2",
  },
  {
    number: "02",
    title: "Mock interviews",
    description:
      "Get comfortable with interview-style questions before the real conversation begins.",
    icon: "message",
    theme: "orange",
    className: "",
  },
  {
    number: "03",
    title: "Actionable feedback",
    description:
      "Understand what went well, identify weak spots, and find practical ways to improve your answers.",
    icon: "chart",
    theme: "green",
    className: "",
  },
  {
    number: "04",
    title: "Track your progress",
    description:
      "Keep your preparation organized and see how your confidence develops with every practice session.",
    icon: "layers",
    theme: "blue",
    className: "md:col-span-2",
  },
];

const themes = {
  violet: {
    icon: "bg-violet-100 text-violet-700",
    number: "text-violet-600",
    accent: "bg-violet-500",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700",
    number: "text-orange-600",
    accent: "bg-orange-500",
  },
  green: {
    icon: "bg-emerald-100 text-emerald-700",
    number: "text-emerald-600",
    accent: "bg-emerald-500",
  },
  blue: {
    icon: "bg-sky-100 text-sky-700",
    number: "text-sky-600",
    accent: "bg-sky-500",
  },
};

function FeatureIcon({ name }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}>
      {name === "target" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </>
      )}
      {name === "message" && (
        <>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          <path d="M8 12h8M8 8.5h5" />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 3 5-7" />
        </>
      )}
      {name === "layers" && (
        <>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </>
      )}
    </svg>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-stone-200/70 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Everything you need to prepare
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-stone-900 sm:text-4xl lg:text-5xl">
            Better preparation.
            <br className="hidden sm:block" />{" "}
            <span className="text-violet-600">Better interviews.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg sm:leading-8">
            Interview preparation shouldn't feel overwhelming.
            Everything is designed to help you practice smarter,
            build confidence, and show up ready.
          </p>
        </div>

        {/* Feature bento grid */}
        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2">
          {features.map((feature) => {
            const theme = themes[feature.theme];

            return (
              <article
                key={feature.number}
                className={`group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-[#faf9f6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-stone-900/[0.04] sm:p-8 ${feature.className}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.icon}`}
                  >
                    <FeatureIcon name={feature.icon} />
                  </div>

                  <span
                    className={`text-xs font-semibold tracking-widest ${theme.number}`}
                  >
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-7 text-stone-500 sm:text-base">
                  {feature.description}
                </p>

                {/* Small decorative accent */}
                <div className="mt-6 flex items-center gap-2">
                  <span
                    className={`h-1 w-8 rounded-full transition-all duration-300 group-hover:w-12 ${theme.accent}`}
                  />
                  <span className="h-1 w-2 rounded-full bg-stone-300" />
                  <span className="h-1 w-2 rounded-full bg-stone-200" />
                </div>

                {feature.number === "01" && (
                  <div className="pointer-events-none absolute -bottom-10 -right-8 hidden h-36 w-36 rounded-full border-[24px] border-violet-100/60 md:block" />
                )}

                {feature.number === "04" && (
                  <div className="pointer-events-none absolute -bottom-10 -right-8 hidden h-36 w-36 rotate-12 rounded-3xl border border-sky-200/70 md:block" />
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-stone-900">
              Your next interview is worth preparing for.
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              Start practicing at your own pace, one session at a time.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 sm:w-auto"
          >
            Start practicing
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
