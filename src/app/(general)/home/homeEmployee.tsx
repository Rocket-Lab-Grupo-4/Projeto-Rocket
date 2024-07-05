import React from "react";
import styles from "./Home.module.scss";
import Perfil from "@/app/components/perfil/perfil";
import { useRouter } from "next/navigation";

export default function HomeEmployee() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.headerRight}>
        <Perfil badge={false} />
      </div>
      <div>
        <div className={styles.content}>
          <div className={styles.leftBubble}>
            <img
              src="/assets/leftBubble.png"
              alt="Balão Esquerda"
              className={styles.leftBubble}
            />
            <div className={styles.bubbleTextL}>
              <p>Bem-vindo ao sistema de avaliações da V-Projects!</p>
              <p>
                Queremos crescer juntos com os nossos colaboradores, por isso
                implementamos um sistema de ciclos avaliativos para melhor
                entendimento do nosso desmepenho como equipe e pessoal.
              </p>
            </div>
          </div>

          <img
            src="/assets/welcome-image.png"
            alt="Welcome"
            className={styles.homeWomen}
          />

          <div className={styles.rightBubble}>
            <img
              src="/assets/rightBubble.png"
              alt="Balão Direita"
              className={styles.rightBubble}
            />
            <div className={styles.bubbleTextR}>
              <p>
                O ciclo de avaliações é composto por um processo de{" "}
                <b>Auto Avaliação</b>, seguindo critérios <b>comportamentais</b>{" "}
                e de <b>execução</b>.
              </p>
              <p>
                O processo dura em torno de 40 mins, então reserve um tempo e
                escolha um local tranquilo para iniciar o processo!
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className={styles.beginButton}
        onClick={() => {
          router.push("/Avaliacoes");
        }}
      >
        Começar Avaliações
      </button>
    </div>
  );
}
