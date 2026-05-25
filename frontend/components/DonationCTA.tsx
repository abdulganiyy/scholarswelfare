"use client";

const DonationCTA = () => {
  return (
    <section className="bg-[#1f3427] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b8d1bf]">
          Support Ongoing Charity
        </p>

        <h3 className="mt-5 text-5xl font-bold tracking-tight">
          Give Sadaqah With Full Transparency
        </h3>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#d8e4db]">
          Every contribution is tracked securely and reflected in the live
          donation system to maintain community trust and accountability.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 mb-12">
          {["₦1,000", "₦5,000", "₦10,000", "₦20,000"].map((amount) => (
            <button
              key={amount}
              className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-[#1f3427]"
            >
              {amount}
            </button>
          ))}
        </div>

        <a
          href="#donate"
          className="mt-8 rounded-full bg-white px-10 py-4 text-sm font-bold text-[#1f3427] shadow-xl transition hover:scale-[1.02]"
        >
          Continue to Donation
        </a>
      </div>
    </section>
  );
};

export default DonationCTA;
