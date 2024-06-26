"use client";
import { Star } from "@/app/assets";
import React, { useEffect, useState } from "react";
import styles from "./results.module.scss";
import LineChartComponent from "@/app/components/charts/lineCharts";
import PieChartComponent from "@/app/components/charts/pieCharts";
import { LineData, PieData } from "./dataCharts";
import { BlueButton } from "@/app/components/buttons/button";
import { avaliation } from "@/app/interfaces/avaliation";
import ReportPDF from "./pdf";
import BlocoResumo from "@/app/components/blocoResumo/BlocoResumo";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { UserProps } from "@/app/interfaces/user";
import { SpeechBubble } from "@/app/components/speechBubble/bubble";
import Perfil from "@/app/components/perfil/perfil";
import { useFetchAssignments } from "@/app/hooks/useFetchAssignmnet";
import { assignment } from "@/app/interfaces/assignment";
import { formatDate } from "@/utils/formatDate";

const certificateList = ["liderança", "soft skills", "comunicação positiva"];

const userId = "clxtlggn60000cvzgissdxodd";

export default function Resultados() {
  const [user, setUser] = useState({} as UserProps);
  const [manager, setManager] = useState(false);
  const [avaliations, setAvaliations] = useState([] as assignment[]);

  const { fecthAssignmentsByUser, getAllAssignments, getAllAvaliationsByUserAssignmentId } = useFetchAssignments();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get(`/user/${userId}`);
      setUser(response.data);
      setManager(response.data.manager);

      const assignmentsByUser = await fecthAssignmentsByUser(userId);

      // get avaliations name, dates
      const assignmentIds = assignmentsByUser.map((au) => au.assignmentId);
      const fetchedAssignments = await getAllAssignments(assignmentIds);
      setAvaliations(fetchedAssignments);

      // get avaliations media, type (auto, avaliationsbymanager)
      const userAssignmentIds = assignmentsByUser.map((au) => au.id);
      const avaliations = await getAllAvaliationsByUserAssignmentId(userAssignmentIds);
      console.log(avaliations);
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <Perfil picture={user.image} name={user.name} badge={false} />

      {manager ? (
        <>
          <h2 className={styles.title}>
            Acompanhe a evolução da Maria Clara Santana da Cruz
          </h2>
          <BlocoResumo
            nome={user.name}
            cargo={user.office}
            mediaAutoAvaliacao={5.0}
            imagemUrl={user.image ?? ""}
          />
        </>
      ) : (
        <SpeechBubble>
          Sua média no último ciclo foi de: 5.0! Baixe o relatório para mais
          detalhes
        </SpeechBubble>
      )}

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
                <p className={styles.width}>
                  {formatDate(avaliation.dataAnswered)}
                </p>
                <p className={styles.width}>
                  {formatDate(avaliation.dateConcluded)}
                </p>
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
