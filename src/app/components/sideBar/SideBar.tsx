"use client";
import React from "react";
import styles from "./SideBar.module.scss";
import Link from "next/link";
import useActiveLink from "../../hooks/useActiveLink";
import { OutlinedButton } from "../buttons/button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/navigation";
const SideBar = ({ children }: { children: React.ReactNode }) => {
  const { activeLink, handleLinkClick } = useActiveLink();

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/assets/logo-side.png" alt="Logo" className={styles.logo} />
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            <li className={activeLink === "/home" ? styles.active : ""}>
              <Link href="/home" onClick={() => handleLinkClick("/home")}>
                Home
              </Link>
            </li>
            <li className={activeLink === "/avaliacoes" ? styles.active : ""}>
              <Link
                href="/avaliacoes"
                onClick={() => handleLinkClick("/avaliacoes")}
              >
                Avaliações
              </Link>
            </li>
            <li className={activeLink === "/resultados" ? styles.active : ""}>
              <Link
                href="/resultados"
                onClick={() => handleLinkClick("/resultados")}
              >
                Resultados
              </Link>
            </li>
            <li className={activeLink === "/seus-dados" ? styles.active : ""}>
              <Link
                href="/seus-dados"
                onClick={() => handleLinkClick("/seus-dados")}
              >
                Seus Dados
              </Link>
            </li>
            <OutlinedButton
              width="169px"
              height="44px"
              onClick={() => {
                router.push("/");
              }}
            >
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
