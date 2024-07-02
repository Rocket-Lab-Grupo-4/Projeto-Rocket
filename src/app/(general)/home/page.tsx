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
        <div className={styles.bubble}>
          <p>Bem-vindo ao sistema de avaliações da V-Projects!</p>
          <br />
          <p>Queremos crescer juntos com os nossos colaboradores, por isso implementamos um sistema de ciclos avaliativos para melhor entendimento do nosso desmepenho como equipe e pessoal.</p>
          <img src="/assets/rightBubble.png" alt="Balão Direita" className={styles.rightBubble} />
        </div>
        <div className={styles.bubble}>
          <label>
            <p>O ciclo de avaliações é composto por dois tipos de avaliações, que medem critérios de desempenho e:</p>
            <br />
            <ol>
              <li>Auto avaliação</li>
              <li>Avaliação 360</li>
            </ol>
            <br />
            <p>O processo dura em torno de 40 mins, então reserve um tempo e escolha um local tranquilo para iniciar o processo!</p>
          </label>
          <img src="/assets/leftBubble.png" alt="Balão Esquerda" className={styles.leftBubble} />
        </div>
        <button className={styles.beginButton}>Começar Avaliações</button>
        <img src="/assets/welcome-image.png" alt="Welcome" className={styles.homeWomen} />
      </div >
    </div >

  );
}
