"use client";
import styles from "./historico.module.scss";
import { BlueButton, GreenButton } from "@/app/components/buttons/button";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDate } from "@/utils/formatDate";
import { UnionStatusAndAssignment } from "./page";
import { useRouter } from "next/navigation";

function OpenAvaliation({
  avaliations,
}: {
  avaliations: UnionStatusAndAssignment[];
}) {
  const router = useRouter();

  return (
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
            {avaliation.status ? (
              <CheckCircleIcon
                style={{ color: "#48742c", marginRight: "5px" }}
              />
            ) : (
              <ErrorIcon style={{ color: "#eb3223", marginRight: "5px" }} />
            )}
            <p className={styles.width}>{avaliation.type}</p>
            <p className={styles.width}>
              {formatDate(avaliation.dataAnswered || "")}
            </p>
            <p className={styles.width}>
              {formatDate(avaliation.dateConcluded)}
            </p>
            <div className={styles.buttonsContainer}>
              <BlueButton
                width="145px"
                height="30px"
                borderRadius="8px"
                onClick={() => {}}
              >
                Visualizar
              </BlueButton>
              <GreenButton
                width="145px"
                height="30px"
                borderRadius="8px"
                onClick={() => {
                  router.push(`/Avaliacoes/${avaliation.userId}?assignmentId=${avaliation.assignmentId}`);
                }}
              >
                Alterar
              </GreenButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpenAvaliation;
