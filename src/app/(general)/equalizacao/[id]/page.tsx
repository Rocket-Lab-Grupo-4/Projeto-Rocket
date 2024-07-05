"use client";

import React, { use, useEffect, useState } from "react";
import QuestionsPage from "@/app/components/blocoFormulario/QuestionsPage";
import BlocoResumo from "@/app/components/blocoResumo/BlocoResumo";
import styles from "./equalizacao.module.scss";
import Perfil from "@/app/components/perfil/perfil";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { UserProps } from "@/app/interfaces/user";

export default function Equalizacao() {
  const { id } = useParams();

  const [colaborador, setColaborador] = useState<UserProps>();
  const getColaborador = async () => {
    const user = await api.get(`/user/${id}`);
    setColaborador(user.data);
  };

  useEffect(() => {
    getColaborador();
  }, [colaborador]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRight}>
        <Perfil badge={false} />
      </div>
      <header className={styles.header}>
        <h2>Avaliação do gestor: </h2>
        <h3>Colaborador: </h3>
        <BlocoResumo
          nome={colaborador?.name ?? ""}
          cargo={colaborador?.office ?? ""}
          mediaAutoAvaliacao={0}
          imagemUrl={colaborador?.image ?? ""}
        />
      </header>
      <div className={styles.bubble}>
        <p>
          Avalie o colaborador, atribua a cada critério mencionado uma nota de 1
          a 5
        </p>
      </div>
      <div className={styles.content}>
        <QuestionsPage />
      </div>
    </div>
  );
}
