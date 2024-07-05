"use client";
import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import styles from "./Perfil.module.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, styled } from "@mui/material";
import { useSession } from "next-auth/react";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "10px",
    height: "10px",
    minWidth: "10px",
    backgroundColor: "#BC0000",
    padding: "0 2px",
    borderRadius: "50%",
  },
}));

interface PerfilProps {
  badge: boolean;
}

function Perfil({ badge }: PerfilProps) {
  const { data: session, status } = useSession();

  const name = session?.user?.name;
  const picture = session?.user?.image;

  return (
    <div className={styles.headerRight}>
      <IconButton
        aria-label="notifications"
        sx={{ color: "#00F999", background: "#F6F5F5" }}
      >
        {badge ? (
          <StyledBadge badgeContent="">
            <NotificationsIcon />
          </StyledBadge>
        ) : (
          <NotificationsIcon />
        )}
      </IconButton>
      <div className={styles.welcomeText}>
        <span>Bem-vinda, {name}!</span>
        <img
          src={picture ?? "/assets/image-perfil.png"}
          alt={name}
          className={styles.profilePic}
        />
      </div>
    </div>
  );
}

export default Perfil;
