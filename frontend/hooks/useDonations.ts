"use client";

import { Donation } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const useDonations = () => {
  const queryClient = useQueryClient();

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

  return {
    data,
    isLoading,
  };
};
