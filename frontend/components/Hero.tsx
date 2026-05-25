"use client";

import { Donation } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const Hero = () => {
  const queryClient = useQueryClient();

  const { data: monthlyDonations } = useQuery({
    queryKey: ["monthly-donations"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/donation/monthly`).then(
        (res) => res.json(),
      ),
  });

  // 1. Fetch initial messages via HTTP
  const { data, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/donation`).then((res) =>
        res.json(),
      ),
  });

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`); // Connects to the host serving the page

    socket.on("connect", () => {
      console.log("Connected to server!");
    });

    const handleNewDonation = (newDonation: Donation) => {
      // Update the cache immediately without a new network request
      queryClient.setQueryData(["donations"], (oldData: Donation[]) => {
        return oldData ? [newDonation, ...oldData] : [newDonation];
      });
    };

    socket.on("new-donation", handleNewDonation);

    return () => {
      socket.disconnect();
    };
  }, []);

  const donations: Donation[] = data ?? [];

  const stats = [
    {
      label: "Total Raised",
      value: "₦2.4M",
    },
    {
      label: "Donors",
      value: "1,240",
    },
    {
      label: "Students Supported",
      value: "32",
    },
    {
      label: "Qur’an Classes",
      value: "18",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,#2e5b3f_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-[#d5d0c2] bg-white px-4 py-2 text-sm shadow-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-600" />
            Verified NGO Account • Transparent Donation Tracking
          </div>

          <h2 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            Support Islamic Knowledge & Community Guidance
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#556257]">
            Your donations directly support scholars, Qur’an education, Islamic
            education — with live donation transparency.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="rounded-full bg-[#2e5b3f] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Donate Now
            </a>

            <button className="rounded-full border border-[#cfc7b8] bg-white px-8 py-4 text-sm font-semibold transition hover:bg-[#f1efe8]">
              View Live Donations
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="hidden rounded-2xl border border-[#e7e2d6] bg-white p-5 shadow-sm"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-[#66736a]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE DONATION CARD */}
        <div className="relative flex items-center justify-center">
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
      </div>
    </section>
  );
};

export default Hero;
