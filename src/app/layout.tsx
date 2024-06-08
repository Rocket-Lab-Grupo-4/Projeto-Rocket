import type { Metadata } from "next";
import SideBar from "./components/sideBar/SideBar";
import "../styles/globals.scss";
import sideStyles from "./components/sideBar/SideBar.module.scss";

export const metadata: Metadata = {
  title: "Projeto-Rocket",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className={sideStyles.appContainer}>
          <SideBar>{children}</SideBar>
        </div>
      </body>
    </html>
  );
}
