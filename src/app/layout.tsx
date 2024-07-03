"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SideBar from "./components/sideBar/SideBar";
import "../styles/globals.scss";
import sideStyles from "./components/sideBar/SideBar.module.scss";
import NextAuthSessionProvider from "../providers/sessionprovider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSideBar = pathname !== "/login" && pathname !== "/cadastro";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projeto-Rocket</title>
      </head>
      <body>
        <div className={sideStyles.appContainer}>
          {showSideBar ? (
            <NextAuthSessionProvider>
              <SideBar>{children}</SideBar>
            </NextAuthSessionProvider>
          ) : (
            children
          )}
        </div>
      </body>
    </html>
  );
}
