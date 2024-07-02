import React from "react";
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.headerRight}>
        <div className={styles.notificationIcon}>🔔</div>
        <div className={styles.welcomeText}>
          <span>Bem-vinda, Maria!</span>
          <img src="/assets/image-perfil.png" alt="Profile" className={styles.profilePic} />
          <div />
          <div />
        </div>
      </div>
      <div className={styles.home}>
        <div className={styles.bubbleTextL}>
          <p>Bem-vindo ao sistema de avaliações da V-Projects!</p>
          <p>Queremos crescer juntos com os nossos colaboradores, por isso implementamos um sistema de ciclos avaliativos para melhor entendimento do nosso desmepenho como equipe e pessoal.</p>
        </div>
        <div className={styles.bubbleTextR}>
          <p>O ciclo de avaliações é composto por um processo de <b>Auto Avaliação</b>, seguindo critérios <b>comportamentais</b> e de <b>execução</b>.</p>
          <p>O processo dura em torno de 40 mins, então reserve um tempo e escolha um local tranquilo para iniciar o processo!</p>
        </div>
        <img src="/assets/leftBubble.png" alt="Balão Esquerda" className={styles.leftBubble} />
        <img src="/assets/rightBubble.png" alt="Balão Direita" className={styles.rightBubble} />
        <button className={styles.beginButton}>Começar Avaliações</button>
        <img src="/assets/welcome-image.png" alt="Welcome" className={styles.homeWomen} />
      </div >
    </div >

  );
}
