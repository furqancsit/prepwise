<<<<<<< HEAD

import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#20201f]">
      <section className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-6 py-20 sm:px-10">
        {/* Label */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium text-[#6d5ce8]">
          <Sparkles size={17} />
          About PrepWise
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Prepare with purpose.
          <span className="block text-[#6d5ce8]">
            Interview with confidence.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#6f6e69] sm:text-lg">
          PrepWise is an AI-powered interview preparation platform that
          helps candidates practice real-world interviews, improve their
          answers, and build the confidence they need to succeed.
        </p>

        {/* Mission */}
        <div className="mt-10 flex max-w-2xl gap-4 border-l-2 border-[#6d5ce8] pl-5">
          <BrainCircuit
            size={24}
            className="mt-1 shrink-0 text-[#6d5ce8]"
          />
          <div>
            <h2 className="text-base font-semibold">
              Better preparation. Better opportunities.
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#777570] sm:text-base">
              We believe every candidate deserves a chance to practice,
              learn from feedback, and grow without the pressure of a
              real interview.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/start"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6d5ce8] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#5948d5]"
          >
            Start your preparation
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-[#20201f]/10 pt-6">
          <p className="text-sm text-[#85827c]">
            PrepWise — Your journey to interview confidence starts here.
          </p>
        </div>
      </section>
    </main>
  );
}
=======
import React from 'react'

const About = () => {
  return (
    <div>About</div>
  )
}

export default About
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
