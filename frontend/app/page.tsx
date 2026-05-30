"use client";

import Script from "next/script";
import Donate from "@/components/Donate";
import DonationCTA from "@/components/DonationCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Impacts from "@/components/Impacts";
import Scholars from "@/components/Scholars";

export default function HomePage() {
  return (
    <>
      <Script
        src="https://js.paystack.co/v2/inline.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-[#f8f7f2] text-[#1d2a1f]">
        {/* NAVBAR */}
        <Header />

        {/* HERO */}
        <Hero />

        <Donate />

        {/* IMPACT */}
        {/* <Impacts /> */}

        {/* SCHOLAR SECTION */}
        {/* <Scholars /> */}

        {/* DONATION CTA */}
        <DonationCTA />

        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
}
