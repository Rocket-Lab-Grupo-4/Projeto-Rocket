"use client";
import { Bubble, Star } from "@/app/assets";
import React from "react";
import Image from "next/image";
import styles from "./results.module.scss";
import LineChartComponent from "@/app/components/charts/lineCharts";
import PieChartComponent from "@/app/components/charts/pieCharts";
import { LineData, PieData } from "./dataCharts";
import { BlueButton } from "@/app/components/buttons/button";
import { avaliation } from "@/app/interfaces/avaliation";
import ReportPDF from "./pdf";

const certificateList = ["liderança", "soft skills", "comunicação positiva"];

const avaliations: avaliation[] = [
  {
    type: "liderança",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
  {
    type: "soft skills",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
  {
    type: "comunicação positiva",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
];

export default function Resultados() {
  return (
    <div className={styles.container}>
      <div className={styles.baloonContainer}>
        <Image
          src={Bubble}
          alt="Balão de fala"
          className={styles.baloonImage}
        />
        <p className={styles.baloonText}>
          Sua média no último ciclo foi de: 5.0! Baixe o relatório para mais
          detalhes
        </p>
      </div>

      <div className={styles.charts}>
        <div className={styles.subsection1_3}>
          <h2 className={styles.subtitle}>Certificados</h2>

          <div className={styles.media}>
            <p>Excepcional:</p>
            <p className={styles.note}>0</p>
          </div>
          <h2 className={styles.subtitle}>Certificados</h2>
          <div className={styles.certificate}>
            {certificateList.map((certificate, index) => (
              <div key={index}>
                <p className={styles.inline}>
                  <img src={Star.src} alt="Estrela" className={styles.star} />
                  {certificate}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.subsection1_3}>
          <h2 className={styles.subtitle}>Suas notas desde que chegou aqui</h2>
          <LineChartComponent data={LineData} />
        </div>
        <div className={styles.subsection1_3}>
          <h2 className={styles.subtitle}>Comparativo por critérios</h2>
          <PieChartComponent data={PieData} />
        </div>
      </div>
      <div>
        <div>
          <div className={styles.lineGrey}>
            <p className={`${styles.subtitle} ${styles.width}`}>Tipo</p>
            <p className={`${styles.subtitle} ${styles.width}`}>
              Data de realização
            </p>
            <p className={`${styles.subtitle} ${styles.width}`}>
              Data de fechamento
            </p>
          </div>
          <div>
            {avaliations.map((avaliation, index) => (
              <div
                key={index}
                className={index % 2 === 0 ? styles.lineWhite : styles.lineGrey}
              >
                <p className={styles.width}>{avaliation.type}</p>
                <p className={styles.width}>{avaliation.dateRealization}</p>
                <p className={styles.width}>{avaliation.dateClosing}</p>
                <BlueButton
                  width="180px"
                  height="30px"
                  borderRadius="8px"
                  onClick={() => {
                    ReportPDF();
                  }}
                >
                  Baixar Relatório
                </BlueButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
