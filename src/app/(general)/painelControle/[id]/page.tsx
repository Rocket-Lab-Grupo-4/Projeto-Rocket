"use client";
import { useEffect, useState } from "react";
import styles from "./panelControl.module.scss";
import NewCicle from "@/app/components/newCicleCard/newCicle";
import ControlledSwitches from "@/app/components/switch/switch";
import SearchBar from "@/app/components/searchBar/searchBar";
import { BlueButton } from "@/app/components/buttons/button";
import { formatDate } from "@/utils/formatDate";

interface Avaliation {
  name: string;
  media: number;
  dateConcluded: string;
}

const avaliations: Avaliation[] = [
  {
    name: "Avaliação de desempenho",
    media: 8.5,
    dateConcluded: "2021-09-01",
  },
  {
    name: "Avaliação de desempenho",
    media: 8.5,
    dateConcluded: "2021-09-01",
  },
  {
    name: "Avaliação de desempenho",
    media: 8.5,
    dateConcluded: "2021-09-01",
  },
  {
    name: "Avaliação de desempenho",
    media: 8.5,
    dateConcluded: "2021-09-01",
  },
  {
    name: "Avaliação de desempenho",
    media: 8.5,
    dateConcluded: "2021-09-01",
  },
];

function ControlPanel() {
  const [checked, setChecked] = useState(true);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <div>
          <p className={styles.title}>Programe um novo ciclo:</p>
          <NewCicle programatedCicle={[]} />
        </div>
        <div className={styles.containerSwitch}>
          <p>Controle manual dos ciclos de avaliação:</p>
          <ControlledSwitches getValues={handleChange} />
        </div>
      </div>
      <div>
        <p className={styles.title}>
          Para encontrar um colaborador específico, basta pesquisar:
        </p>
        <SearchBar onSearch={() => {}} />
      </div>

      <div>
        <p className={styles.title}>Colaboradores aptos para equalização:</p>
        <div className={styles.lineGrey}>
          <p className={`${styles.subtitle} ${styles.width}`}>Tipo</p>
          <p className={`${styles.subtitle} ${styles.width}`}>
            Data de realização
          </p>
        </div>
        {avaliations.map((avaliation, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? styles.lineWhite : styles.lineGrey}
          >
            <p className={styles.width}>{avaliation.name}</p>
            <p className={styles.width}>{avaliation.media}</p>
            <p className={styles.width}>
              {formatDate(avaliation.dateConcluded ?? "")}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;
