"use client";
import { avaliation } from "@/app/interfaces/avaliation";
import styles from "./historico.module.scss";
import { BlueButton, GreenButton } from "@/app/components/buttons/button";

const avaliations: avaliation[] = [
  {
    type: "ciclo de avaliação 1",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
  {
    type: "ciclo de avaliação 2",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
  {
    type: "ciclo de avaliação 3",
    dateRealization: "01/01/2021",
    dateClosing: "01/02/2021",
  },
];

function Avaliation() {
  return (
    <div>
      <div className={styles.lineGrey}>
        <p className={`${styles.subtitle} ${styles.width}`}>Tipo</p>
        <p className={`${styles.subtitle} ${styles.width}`}>
          Data de realização
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
            <div className={styles.buttonsContainer}>
              <BlueButton
                width="145px"
                height="30px"
                borderRadius="8px"
                onClick={() => {}}
              >
                Visualizar
              </BlueButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Avaliation;
