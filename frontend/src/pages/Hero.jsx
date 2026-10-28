
import { Link } from "react-router-dom";

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

function Hero() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f6] text-[#20201f]">
      {/* Navigation */}
     
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-violet-200/40 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 top-72 h-64 w-64 rounded-full bg-orange-100/60 blur-[90px]" />

        <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e8e3dc] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#55514d] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Your next opportunity starts here
              <ArrowUpRight />
            </div>

            <h1 className="text-[2.9rem] font-semibold leading-[1.08] tracking-[-0.065em] sm:text-6xl lg:text-[4.5rem]">
              Stop guessing.
              <br />
              Start <span className="text-[#6d5ce8]">interviewing</span>
              <br className="hidden sm:block" />
              with confidence.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#77716b] sm:text-lg sm:leading-8">
              Practice real interview scenarios, sharpen your answers,
              and turn the job you want into the offer you deserve.
              Your next great interview starts with one good session.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-6 py-3 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(109,92,232,0.2)] transition hover:-translate-y-0.5 hover:bg-[#5c4bd4]"
              >
                Start practicing <ArrowUpRight />
              </Link>

              <Link
                to="/interviews"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e3ded7] bg-white/70 px-6 py-3 text-sm font-semibold text-[#373430] transition hover:border-[#c8bdfb] hover:bg-white"
              >
                Explore interviews
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#e9e5df] pt-6">
              <div className="flex -space-x-2">
                {["M", "A", "S", "R"].map((letter, index) => (
                  <div
                    key={letter}
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#faf9f6] text-xs font-semibold",
                      "bg-[#e9e2ff] text-[#5948ba]",
                      "bg-[#f9dfcf] text-[#9a5836]",
                      "bg-[#dcece3] text-[#397252]",
                      "bg-[#f3e6bc] text-[#886c25]",
                    ][index]}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Built for your next big move
                </p>
                <p className="mt-0.5 text-xs text-[#89837c]">
                  Practice at your pace. Improve every round.
                </p>
              </div>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative mx-auto w-full max-w-[550px] lg:ml-auto">
            <div className="absolute -right-3 -top-5 h-24 w-24 rounded-3xl bg-[#e8e1ff] sm:-right-5" />
            <div className="absolute -bottom-5 -left-4 h-28 w-28 rounded-full bg-[#f7e5d4]" />

            <div className="relative overflow-hidden rounded-2xl border border-[#e7e2dc] bg-white shadow-[0_25px_80px_rgba(42,34,25,0.09)]">
              {/* Window header */}
              <div className="flex items-center justify-between border-b border-[#efede9] px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eeeaff] text-[#6d5ce8]">
                    <ArrowUpRight />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your workspace</p>
                    <p className="text-[11px] text-[#969089]">
                      Interview preparation
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#eaf6ed] px-2.5 py-1 text-[11px] font-medium text-[#398151]">
                  ● On track
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <p className="text-sm text-[#858079]">
                    Good morning 👋
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    Ready for your next interview?
                  </h2>
                </div>

                {/* Progress card */}
                <div className="rounded-xl border border-[#ece8ff] bg-[#f7f5ff] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#796db9]">
                        YOUR PROGRESS
                      </p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight">
                        78<span className="text-lg text-[#8177b8]">/100</span>
                      </p>
                      <p className="mt-1 text-xs text-[#7d75a0]">
                        Overall readiness score
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#d8cffd] border-t-[#6d5ce8] text-xs font-semibold text-[#6d5ce8]">
                      78%
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e8e2ff]">
                    <div className="h-full w-[78%] rounded-full bg-[#7967ed]" />
                  </div>
                </div>

                {/* Session list */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">
                      Pick up where you left off
                    </h3>
                    <span className="text-xs text-[#8a847e]">
                      3 tracks
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: "Frontend Developer",
                        subtitle: "Technical interview",
                        color: "bg-[#eeeaff] text-[#705ce1]",
                        icon: "</>",
                      },
                      {
                        title: "Behavioral Round",
                        subtitle: "Communication & culture",
                        color: "bg-[#fcebdc] text-[#bd7740]",
                        icon: "✳",
                      },
                      {
                        title: "JavaScript Fundamentals",
                        subtitle: "Core concepts",
                        color: "bg-[#e3f3e8] text-[#43855a]",
                        icon: "JS",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 rounded-xl border border-[#efede9] p-3 transition hover:border-[#d9d0ff] hover:bg-[#fcfbff]"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${item.color}`}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-[#918a83]">
                            {item.subtitle}
                          </p>
                        </div>
                        <ArrowUpRight />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#242321] p-4 text-white">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M10 8.5 16 12l-6 3.5z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      Ready for a mock interview?
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      Take the next step in your preparation.
                    </p>
                  </div>
                  <ArrowUpRight />
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-[36%] hidden items-center gap-2.5 rounded-xl border border-[#e9e4dd] bg-white p-3 shadow-lg sm:flex lg:-left-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f4e8] text-sm text-[#388653]">
                ✓
              </div>
              <div>
                <p className="text-xs font-semibold">Progress saved</p>
                <p className="mt-0.5 text-[10px] text-[#928c85]">
                  Every session counts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section
        id="features"
        className="border-t border-[#eae6df] bg-white/60"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
          {[
            ["01", "Practice with purpose", "Prepare for the questions that matter."],
            ["02", "Build real confidence", "Get comfortable before the big day."],
            ["03", "See your progress", "Turn every session into improvement."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex gap-4">
              <span className="pt-0.5 text-xs font-semibold text-[#8b7be7]">
                {number}
              </span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#817b74]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Hero;
