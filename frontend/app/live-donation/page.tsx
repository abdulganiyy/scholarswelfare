"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDonations } from "@/hooks/useDonations";
import { Donation } from "@/types";

export default function LiveDonationsPage() {
  const { data: monthlyDonations } = useQuery({
    queryKey: ["monthly-donations"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/donation/monthly`).then(
        (res) => res.json(),
      ),
  });

  const { data } = useDonations();

  const donations: Donation[] = data?.data ?? [];

  return (
    <>
      <main className="min-h-screen bg-[#f8f7f2] text-[#1d2a1f]">
        <header className="sticky top-0 z-50 border-b border-[#e7e2d6] bg-[#f8f7f2]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <Link href="/">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Scholars Welfare
                </h1>
                <p className="text-sm text-[#5c6a5f]">
                  Transparent Islamic Giving
                </p>
              </div>
            </Link>

            <Link
              href="/#donate"
              className="rounded-full bg-[#2e5b3f] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02]"
            >
              Donate Now
            </Link>
          </div>
        </header>
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full max-w-xl rounded-4xl border border-[#e8e1d4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ece7dd] pb-5">
              <div>
                <h3 className="text-xl font-semibold">Live Donations</h3>
                <p className="mt-1 text-sm text-[#6b756d]">
                  Real-time support from the community
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#edf7ef] px-4 py-2 text-sm text-[#2e5b3f]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
                Live
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {donations.map((donation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-[#efe8dc] bg-[#fcfbf8] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold">{donation.name}</p>
                    <p className="mt-1 text-sm text-[#6c746c]">
                      Donation received
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[#2e5b3f]">
                      {donation.amount}
                    </p>
                    <p className="mt-1 text-xs text-[#7b857d]">
                      {donation.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#f5f7f3] p-5">
              <div className="flex items-center justify-between text-sm">
                <span>Monthly Goal</span>
                <span className="font-semibold">₦5,000,000</span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#dde6dd]">
                <div
                  className={`h-full rounded-full bg-[#2e5b3f]`}
                  style={{
                    width: `${(monthlyDonations / 5000000) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-[#6a736c]">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(monthlyDonations / 100)}{" "}
                raised so far
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
