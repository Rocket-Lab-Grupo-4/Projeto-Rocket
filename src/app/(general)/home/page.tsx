"use client";

import ControlPanel from "@/app/(admin-routes)/painelControle/[id]/page";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const manager = session?.user?.manager;

  return <>{manager ? <ControlPanel /> : <p>Welcome, employee!</p>}</>;
}
