"use client";
import styles from "./historico.module.scss";
import { BlueButton } from "@/app/components/buttons/button";
import { UnionStatusAndAssignment } from "./page";
import { formatDate } from '@/utils/formatDate';

function Avaliation({
  avaliations,
}: {
  avaliations: UnionStatusAndAssignment[];
}) {
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
            <p className={styles.width}>{formatDate(avaliation.dataAnswered ?? '')}</p>
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
