"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session ? (
        <>
          <p>Olá {session.user?.name}</p>
          <p>{status}</p>
        </>
      ) : (
        <p>Você não está logado</p>
      )}
    </>
  );
}
