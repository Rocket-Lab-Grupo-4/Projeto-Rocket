"use client;";

import React from "react";
import QuestionsPage from "@/app/components/blocoFormulario/QuestionsPage";
import styles from "./Avaliacoes.module.scss";
import Perfil from "@/app/components/perfil/perfil";

export default function Avaliacoes() {
  return (
    <div className={styles.container}>
      <div className={styles.headerRight}>
        <Perfil badge={false} />
      </div>
      <header className={styles.header}>
        <h2>Ciclo de Avaliações</h2>
        <p>
          O ciclo de avaliações é composto por dois tipos de avalições, a auto
          avaliação e a avaliação 360. Você deve concluir as duas dentro do
          prazo indicado.
        </p>
        <div className={styles.buttons}>
          <button className={styles.autoAvaliacao}>Auto avaliação</button>
          {/* <button className={styles.avaliacao360}>Avaliação 360</button> */}
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.row}>
            <img
              src="/assets/image-exclama.png"
              alt="Atenção"
              className={styles.exclamaPic}
            ></img>
            <p>
              O objetivo do processo de auto avaliação é que o colaborador se
              auto avalie com base nos critérios indicados. Você deverá se dar
              uma nota de 1 a 5, considerando como percebeu o seu desempenho em
              cada critério e justificar o porquê dessa nota em um breve texto.
            </p>
          </div>
          <h3>
            1 - Insatisfatório &nbsp;&nbsp; 2 - Abaixo das expectativas
            &nbsp;&nbsp; 3 - Atendeu às expectativas &nbsp;&nbsp; 4 - Bom
            &nbsp;&nbsp; 5 - Ótimo
          </h3>
        </div>
        <QuestionsPage />
      </div>
    </div>
  );
}
