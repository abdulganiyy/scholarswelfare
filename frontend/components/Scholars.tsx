import React from "react";

const Scholars = () => {
  return (
    <section id="scholar" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="rounded-4xl bg-[#e9efe8] p-10">
          <div className="flex h-full min-h-105 items-center justify-center rounded-[28px] border border-dashed border-[#8fa393] bg-[#f7faf6]">
            <p className="text-lg text-[#617166]">Scholar Image Placeholder</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit rounded-full border border-[#d9d3c7] bg-white px-4 py-2 text-sm shadow-sm">
            Verified Scholar Profile
          </div>

          <h3 className="mt-6 text-5xl font-bold tracking-tight">
            Sheikh Ahmad Yusuf
          </h3>

          <p className="mt-3 text-lg text-[#667066]">
            Islamic Scholar • Tafsir & Fiqh Instructor • Lagos, Nigeria
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#556157]">
            Dedicated to spreading authentic Islamic knowledge through teaching,
            mentorship, Qur’an classes, and community support initiatives.
            Donations help sustain educational programs, student sponsorships,
            and outreach activities.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-[#2e5b3f] px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
              Support This Mission
            </button>

            <button className="rounded-full border border-[#d1cabb] bg-white px-7 py-4 text-sm font-semibold transition hover:bg-[#f5f3ee]">
              Read Impact Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholars;
