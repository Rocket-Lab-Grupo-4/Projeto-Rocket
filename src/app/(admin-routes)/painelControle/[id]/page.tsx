"use client";
import { use, useCallback, useEffect, useState } from "react";
import styles from "./panelControl.module.scss";
import NewCicle from "@/app/components/newCicleCard/newCicle";
import ControlledSwitches from "@/app/components/switch/switch";
import SearchBar from "@/app/components/searchBar/searchBar";
import { BlueButton } from "@/app/components/buttons/button";
import { formatDate } from "@/utils/formatDate";
import api from "@/utils/api";
import { assignment } from "@/app/interfaces/assignment";
import { UserProps } from "@/app/interfaces/user";

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
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  const handleDates = (openDate: string, closeDate: string) => {
    setOpenDate(openDate);
    setCloseDate(closeDate);
  };

  const [OpenAndCloseDates, setOpenAndCloseDates] = useState<
    { id: string; dateOpened: string; dateConcluded: string }[]
  >([]);

  const getAssignment = useCallback(async () => {
    const responseGet = await api.get("/assignment");
    // console.log(responseGet.data);
    const dates = getAllDates(responseGet.data);
    setOpenAndCloseDates(dates);

    if (!responseGet) {
      alert("Erro ao buscar dados");
    }
  }, [api, setOpenAndCloseDates]);

  const getAllDates = (assignment: assignment[]) => {
    return assignment.map((assign) => {
      return {
        id: assign.id,
        dateOpened: assign.dateOpened,
        dateConcluded: assign.dateConcluded,
      };
    });
  };

  function PostAssinmnet() {
    if (!openDate || !closeDate) {
      alert("Preencha as datas");
      return;
    }

    const responsePost = api.post("/assignment", {
      dateOpened: openDate,
      dateConcluded: closeDate,
    });

    if (!responsePost) {
      alert("Erro ao enviar dados");
    }
  }

  function deleteAssignment(id: string) {
    const responseDelete = api.delete(`/assignment/${id}`);

    getAssignment();

    if (!responseDelete) {
      alert("Erro ao deletar dados");
    }
  }
  useEffect(() => {
    getAssignment();
  }, [getAssignment]);

  useEffect(() => {
    getAllusers();
  }, []);

  const [colaborators, setcolaborators] = useState<UserProps[]>([]);
  async function getAllusers() {
    const responseGet = await api.get("/user");
    const colaborators = filtercolaborator(responseGet.data);

    // console.log(colaborators);
    setcolaborators(colaborators);
  }

  const filtercolaborator = (users: UserProps[]) => {
    return users.filter((user) => {
      return user.manager === false;
    });
  };

  const filtercolaboratorByName = (name: string) => {
    const filteredColaborators = colaborators.filter((colaborator) => {
      return colaborator.name.toLowerCase().includes(name.toLowerCase());
    });
  
    setcolaborators(filteredColaborators);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <div>
          <p className={styles.title}>Programe um novo ciclo:</p>
          <NewCicle
            programatedCicle={OpenAndCloseDates}
            getdate={handleDates}
            okClick={PostAssinmnet}
            trashClick={deleteAssignment}
          />
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
        <SearchBar onSearch={filtercolaboratorByName} />
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
                Avaliar
              </BlueButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;
