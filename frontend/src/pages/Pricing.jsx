
import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    description: "Get started and experience interview practice.",
    price: "0",
    period: "forever",
    featured: false,
    features: [
      "2 interview sessions",
      "Access to interview practice",
      "Choose your target role",
      "Review your completed sessions",
    ],
    button: "Start for free",
    to: "/register",
  },
  {
    name: "Pro",
    description: "For candidates who want more room to practice.",
    price: "499",
    period: "month",
    featured: true,
    badge: "MORE PRACTICE",
    features: [
      "More interview sessions",
      "Everything in the Free plan",
      "Keep practicing for upcoming roles",
      "Access to additional practice features",
      "Designed for consistent preparation",
    ],
    button: "Upgrade to Pro",
    to: "/pricing/checkout",
  },
];

function CheckIcon({ featured = false }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        featured
          ? "bg-violet-100 text-violet-700"
          : "bg-stone-100 text-stone-600"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3 w-3"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);

  // Suggested starting price. Adjust to your actual pricing.
  const monthlyPrice = 499;
  const yearlyPrice = 3999;
  const proPrice = yearly ? yearlyPrice : monthlyPrice;

  return (
    <section
      id="pricing"
      className="border-t border-stone-200/70 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            SIMPLE, TRANSPARENT PRICING
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-stone-900 sm:text-4xl lg:text-5xl">
            Start free.
            <br className="hidden sm:block" />{" "}
            <span className="text-violet-600">Upgrade when you're ready.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
            Your first two interviews are on us. Need more practice
            before the big day? Upgrade when you need it.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span
            className={`text-sm ${
              !yearly ? "font-semibold text-stone-900" : "text-stone-500"
            }`}
          >
            Monthly
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((value) => !value)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              yearly ? "bg-violet-600" : "bg-stone-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                yearly ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>

          <span
            className={`text-sm ${
              yearly ? "font-semibold text-stone-900" : "text-stone-500"
            }`}
          >
            Yearly
          </span>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            Save with yearly
          </span>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {plans.map((plan) => {
            const isPro = plan.featured;
            const price = isPro ? proPrice : 0;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                  isPro
                    ? "border-violet-300 bg-[#faf9ff] shadow-[0_12px_45px_rgba(109,92,232,0.09)]"
                    : "border-stone-200 bg-white"
                }`}
              >
                {isPro && (
                  <span className="absolute right-5 top-5 rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-violet-700 sm:right-7 sm:top-7">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    {plan.name}
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-stone-500">
                    / {isPro ? (yearly ? "year" : "month") : "forever"}
                  </span>
                </div>

                {isPro && (
                  <p className="mt-2 text-xs text-stone-500">
                    {yearly
                      ? "Billed annually"
                      : "Billed monthly"}
                  </p>
                )}

                {/* CTA */}
                <Link
                  to={plan.to}
                  className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    isPro
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "border border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {plan.button}
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

                <div className="my-7 border-t border-stone-200/80" />

                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  What's included
                </p>

                <ul className="mt-5 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-stone-600"
                    >
                      <CheckIcon featured={isPro} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {isPro && (
                  <p className="mt-6 rounded-xl border border-violet-100 bg-white/80 p-3 text-xs leading-5 text-stone-500">
                    Need more preparation time? Pro is designed to give
                    you more opportunities to practice.
                  </p>
                )}
              </article>
            );
          })}
        </div>

        {/* Closing note */}
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-stone-500">
          Start with two free interviews. Upgrade whenever you need
          more practice. No paid plan is required to get started.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
