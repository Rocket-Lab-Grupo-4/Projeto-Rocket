import React from "react";
import styles from "./BlocoResumo.module.scss";
import { BlocoResumoProps } from "@/app/interfaces/BlocoResumo";

const BlocoResumo: React.FC<BlocoResumoProps> = ({
  nome,
  cargo,
  mediaAutoAvaliacao,
  imagemUrl,
}) => {
  return (
    <div className={styles.blocoResumo}>
      <img src={imagemUrl} alt={nome} className={styles.imagem} />
      <div className={styles.informacoes}>
        <p>
          <strong>Nome:</strong> {nome}
        </p>
        <p>
          <strong>Cargo:</strong> {cargo}
        </p>
        <p>
          <strong>Média da auto avaliação:</strong>{" "}
          <span className={styles.avaliacao}>
            {mediaAutoAvaliacao.toFixed(1)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BlocoResumo;
