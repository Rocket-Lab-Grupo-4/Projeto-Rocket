"use client;"

import React from "react";
import QuestionsPage from "@/app/components/blocoFormulario/QuestionsPage";
import BlocoResumo from "@/app/components/blocoResumo/BlocoResumo";
import styles from "./equalizacao.module.scss"

export default function Equalizacao() {

    return (
        <div className={styles.container}>

            <div className={styles.headerRight}>
                <div className={styles.notificationIcon}>🔔</div>
                <div className={styles.welcomeText}>
                <span>Bem-vindo, Mauricio!</span>          
                <img src="/assets/image-perfil.png" alt="Profile" className={styles.profilePic} />
                </div>
            </div>
            <header className={styles.header}>
                <h2>Avaliação do gestor: </h2>
                <h3>Colaborador: </h3>
                <BlocoResumo nome={""} cargo={""} mediaAutoAvaliacao={0} imagemUrl={""} />
            </header>
            <div className={styles.content}>
                <QuestionsPage />
            </div>

            {/* <div className={styles.footerButtons}>
                <button className={styles.cancelButton}>Cancelar</button>
                <button className={styles.submitButton}>Enviar</button>
            </div> */}
        </div>
    )


}