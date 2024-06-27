import React from "react";
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerRight}>
          <div className={styles.notificationIcon}>🔔</div>
          <div className={styles.welcomeText}>
            <span>Bem-vinda, Maria!</span>          
            <img src="/assets/image-perfil.png" alt="Profile" className={styles.profilePic} />
          </div>
        </div>
      </div>
    </>
  );
}
