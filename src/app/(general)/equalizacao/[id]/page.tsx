"use client;"

import React from "react";
import QuestionsPage from "@/app/components/blocoFormulario/QuestionsPage";
import BlocoResumo from "@/app/components/blocoResumo/BlocoResumo";
import styles from "./equalizacao.module.scss"
import Perfil from "@/app/components/perfil/perfil";

export default function Equalizacao() {

    return (
        <div className={styles.container}>

            <div className={styles.headerRight}>
            <Perfil badge={false} />
            </div>
            <header className={styles.header}>
                <h2>Avaliação do gestor: </h2>
                <h3>Colaborador: </h3>
                <BlocoResumo nome={""} cargo={""} mediaAutoAvaliacao={0} imagemUrl={""} />
            </header>
            <div className={styles.bubble}>
                    <p>Avalie o colaborador, atribua a cada critério mencionado uma nota de 0 a 5</p>               
            </div>
            <div className={styles.content}>
                <QuestionsPage />
            </div>
        </div>
    )


}