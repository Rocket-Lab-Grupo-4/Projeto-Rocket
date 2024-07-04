"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ControlPanel from "@/app/(admin-routes)/painelControle/[id]/page";
import HomeEmployee from './homeEmployee';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const manager = session?.user?.manager;

  return <>{manager ? <ControlPanel /> : <HomeEmployee />}</>;
}
