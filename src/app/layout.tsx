"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
  // const {
  //   isAuthenticated,
  //   isRegistering,
  //   handleLogin,
  //   handleToggleForm,
  //   setAuthenticated,
  // } = useAuth();
  // const router = useRouter();

  // const handleCadastroSuccess = () => {
  //   setAuthenticated(true);
  // };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     if (isRegistering) {
  //       router.push("/cadastro");
  //     } else {
  //       router.push("/home");
  //     }
  //   }
  // }, [isAuthenticated, isRegistering, router]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projeto-Rocket</title>
      </head>
      <body>
        <div className={sideStyles.appContainer}>
          {/* {isAuthenticated ? ( */}
            <SideBar>{children}</SideBar>
          {/* ) : (
            <>
              {isRegistering ? (
                <Cadastro
                  onToggleForm={handleToggleForm}
                  onSuccess={handleCadastroSuccess}
                />
              ) : (
                <Login onLogin={handleLogin} onToggleForm={handleToggleForm} />
              )}
            </>
          )} */}
        </div>
      </body>
    </html>
  );
}
