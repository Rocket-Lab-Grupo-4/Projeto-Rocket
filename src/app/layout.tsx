"use client";
import React from "react";
import SideBar from "./components/sideBar/SideBar";
import "../styles/globals.scss";
import sideStyles from "./components/sideBar/SideBar.module.scss";
import Login from "./(general)/login/page";
import Cadastro from "./(general)/cadastro/page";
import { useAuth } from "./hooks/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isRegistering, handleLogin, handleToggleForm } =
    useAuth();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projeto-Rocket</title>
      </head>
      <body>
        <div className={sideStyles.appContainer}>
          {isAuthenticated ? (
            <SideBar>{children}</SideBar>
          ) : (
            <>
              {isRegistering ? (
                <Cadastro onToggleForm={handleToggleForm} />
              ) : (
                <Login onLogin={handleLogin} onToggleForm={handleToggleForm} />
              )}
            </>
          )}
        </div>
      </body>
    </html>
  );
}
