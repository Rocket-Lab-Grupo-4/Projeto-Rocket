"use client";
import React, { useEffect } from "react";
import styles from "./SideBar.module.scss";
import Link from "next/link";
import useActiveLink from "../../hooks/useActiveLink";
import { OutlinedButton } from "../buttons/button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const { activeLink, handleLinkClick } = useActiveLink();

  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/login");
  }

  const { data: session } = useSession();
  const manager = session?.user?.manager;

  useEffect(() => {
    console.log(manager);
  }, [manager]);

  const managerOptions = {
    Home: true,
    Avaliacoes: false,
    Resultados: false,
    "Seus dados": true,
  };

  const userOptions = {
    Home: true,
    Avaliacoes: true,
    Resultados: true,
    "Seus dados": true,
  };

  const routeNameFromSeusDados = "Seus dados";
  const correctedRouteNameFromSeusDados = "Seus-dados";

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/Home">
            <img src="/assets/logo-side.png" alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            {manager
              ? Object.entries(managerOptions).map(([routeName, show]) => {
                  return show ? (
                    <li
                      key={routeName}
                      className={
                        activeLink ===
                        `/${
                          routeName === routeNameFromSeusDados
                            ? correctedRouteNameFromSeusDados
                            : routeName
                        }`
                          ? styles.active
                          : ""
                      }
                    >
                      <Link
                        href={`/${
                          routeName === routeNameFromSeusDados
                            ? correctedRouteNameFromSeusDados
                            : routeName
                        }`}
                        onClick={() =>
                          handleLinkClick(
                            `/${
                              routeName === routeNameFromSeusDados
                                ? correctedRouteNameFromSeusDados
                                : routeName
                            }`
                          )
                        }
                      >
                        {routeName.replace("-", " ")}
                      </Link>
                    </li>
                  ) : null;
                })
              : Object.entries(userOptions).map(([routeName, show]) => {
                  return show ? (
                    <li
                      key={routeName}
                      className={
                        activeLink ===
                        `/${
                          routeName === routeNameFromSeusDados
                            ? correctedRouteNameFromSeusDados
                            : routeName
                        }`
                          ? styles.active
                          : ""
                      }
                    >
                      <Link
                        href={`/${
                          routeName === routeNameFromSeusDados
                            ? correctedRouteNameFromSeusDados
                            : routeName
                        }`}
                        onClick={() =>
                          handleLinkClick(
                            `/${
                              routeName === routeNameFromSeusDados
                                ? correctedRouteNameFromSeusDados
                                : routeName
                            }`
                          )
                        }
                      >
                        {routeName.replace("-", " ")}
                      </Link>
                    </li>
                  ) : null;
                })}
            <OutlinedButton width="169px" height="44px" onClick={logout}>
              <LogoutRoundedIcon />
              Sair
            </OutlinedButton>
          </ul>
        </nav>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SideBar;
