import React from "react";

const Impacts = () => {
  return (
    <section id="impact" className="border-y border-[#e8e2d8] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2e5b3f]">
            Impact Transparency
          </p>

          <h3 className="mt-4 text-4xl font-bold tracking-tight">
            Every donation contributes directly to Islamic education and
            community development.
          </h3>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Student scholarships for Islamic studies",
            "Qur’an memorization classes for children",
            "Community feeding & outreach programs",
            "Masjid educational infrastructure support",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-[#ebe5da] bg-[#faf8f4] p-8"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-[#2e5b3f]/10" />
              <p className="text-lg leading-8 text-[#334034]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impacts;
