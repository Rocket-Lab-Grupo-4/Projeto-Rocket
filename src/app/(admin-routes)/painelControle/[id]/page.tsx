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
import { avaliation } from "@/app/interfaces/avaliation";
import { userAssignment } from "@/app/interfaces/userAssignment";
import { useRouter } from "next/navigation";
import Perfil from "@/app/components/perfil/perfil";
import { useSession } from "next-auth/react";

interface Result {
  name: string;
  media: number;
  dateConcluded: string;
  userId: string;
  assignmentId: string;
}

function ControlPanel() {
  const [checked, setChecked] = useState(true);
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");

  const router = useRouter();

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

    const userAssignmnet = await getUserAssignmnets();
    const userAssignmnetIds = getUserAssignmnetIds(userAssignmnet);
    const avaliations = await getAvaliationsByUserAssignmentId(
      userAssignmnetIds
    );

    setAvaliations(avaliations);

    // console.log("avaliações:", avaliations);
    // const userIdsNotEvaluated = getUsersWithoutManagerAvaliation(
    // colaborators,
    // avaliations
    // );
    // setFilteredColaborators(userIdsNotEvaluated);
    // console.log("aqui:", userIdsNotEvaluated);
    // const results = await fetchAvaliations(userIdsNotEvaluated);
    // console.log("results:", results);

    if (!responseGet) {
      alert("Erro ao buscar dados");
    }
  }, [api, setOpenAndCloseDates]);

  const [userNotEvaluated, setUserNotEvaluated] = useState([]);
  const [avaliationNotEvaluated, setAvaliationNotEvaluated] = useState([]);
  const [assignmentNotEvaluated, setAssignmentNotEvaluated] = useState([]);
  const [userAssignmentsNotEvaluated, setUserAssignmentsNotEvaluated] =
    useState([]);
  const printAvaliationsAndUsers = async () => {
    // console.log("função printAvaliationsAndUsers");
    // console.log("avaliações:", avaliations);
    // console.log("colaboradores:", colaborators);
    const userIdsNotEvaluated = getUsersWithoutManagerAvaliation(
      colaborators,
      avaliations
    );
    // console.log("userIdsNotEvaluated 1 :", userIdsNotEvaluated);
    setUserNotEvaluated(userIdsNotEvaluated);

    const results = await fetchAvaliations(userIdsNotEvaluated);
    // console.log("avaliation:", results.flat());
    setAvaliationNotEvaluated(results.flat());
  };

  const getUserAssignmentsByUserId = async () => {
    const userIdsNotEvaluated = getUsersWithoutManagerAvaliation(
      colaborators,
      avaliations
    );
    const results = await fetchUserAssignments(userIdsNotEvaluated);
    const userAssignments = results.flat();
    const fetchAssignmentsT = async () => {
      const res = await Promise.all(
        userAssignments.map(async (result) => {
          const response = await api.get(
            `/assignment/assignment/${result.assignmentId}`
          );
          return response.data;
        })
      );

      return res;
    };

    const assignmentsNotEvaluated = await fetchAssignmentsT();
    // console.log("assignmentsIds:", assignmentsNotEvaluated);
    setAssignmentNotEvaluated(assignmentsNotEvaluated);
  };

  const fetchUserAssignments = async (
    userIdsNotEvaluated: { id: string; name: string }[]
  ) => {
    try {
      const results = await Promise.all(
        userIdsNotEvaluated.map(async (user) => {
          const response = await api.get(`/user-assignment/user/${user.id}`);
          return response.data;
        })
      );
      // console.log("userAssignmentAssociativa:", results);

      setUserAssignmentsNotEvaluated(results);
      return results;
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      return [];
    }
  };

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

  const getUserAssignmnets = useCallback(async () => {
    const responseGet = await api.get("/user-assignment");
    return responseGet.data;
  }, []);

  const getUserAssignmnetIds = (userAssignments: userAssignment[]) => {
    return userAssignments.map((userAssign) => {
      return userAssign.id;
    });
  };

  const getAvaliationsByUserAssignmentId = useCallback(
    async (userAssignmentId: string[]) => {
      const responseGet = await Promise.all(
        userAssignmentId.map((id) =>
          api.get(`/avaliation/findByUserAssignmentId/${id}`)
        )
      );

      let avaliations: avaliation = [];
      responseGet.map((response) => {
        avaliations.push(response.data);
      });
      return avaliations;
    },
    []
  );

  const fetchAvaliations = async (
    userIdsNotEvaluated: { id: string; name: string }[]
  ) => {
    try {
      const results = await Promise.all(
        userIdsNotEvaluated.map(async (user) => {
          const response = await api.get(
            `/avaliation/findByEvaluatedId/${user.id}`
          );
          return response.data;
        })
      );
      return results;
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      return [];
    }
  };

  const getUsersWithoutManagerAvaliation = (
    users: UserProps[],
    avaliations: avaliation[][]
  ): {
    id: string;
    name: string;
  }[] => {
    const userIdsWithoutManagerAvaliation: {
      id: string;
      name: string;
    }[] = [];

    users.forEach((user) => {
      const userAvaliations = avaliations
        .flat()
        .filter((avaliation) => avaliation.evaluatedId === user.id);
      const hasManagerAvaliation = userAvaliations.some(
        (avaliation) => avaliation.avaliationType === "avaliationbymanager"
      );

      if (!hasManagerAvaliation) {
        // return user.id e user.name
        userIdsWithoutManagerAvaliation.push({
          id: user.id,
          name: user.name,
        });
      }
    });

    return userIdsWithoutManagerAvaliation;
  };

  // const getUserIdsNotEvaluated = (users: UserProps[], items: avaliation[]): string[] => {
  //   const evaluatedIds = new Set<string>();

  //   items.forEach(item => {
  //     item.forEach(evaluation => {
  //       evaluatedIds.add(evaluation.evaluatedId);
  //     });
  //   });

  //   return users
  //     .filter(user => !evaluatedIds.has(user.id))
  //     .map(user => user.id);
  // };

  const [colaborators, setcolaborators] = useState<UserProps[]>([]);
  const [avaliations, setAvaliations] = useState<avaliation[]>([]);

  useEffect(() => {
    getAllusers();
  }, []);

  useEffect(() => {
    getAssignment();
  }, [getAssignment]);

  useEffect(() => {
    printAvaliationsAndUsers();
    getUserAssignmentsByUserId();
  }, [avaliations]);

  const [colaboratorsToEqualization, setColaboratorsToEqualization] = useState<
    Result[]
  >([]);
  useEffect(() => {
    const colaboratorsToEqualization = linkAttributes(
      userNotEvaluated,
      assignmentNotEvaluated,
      avaliationNotEvaluated,
      userAssignmentsNotEvaluated.flat()
    );

    setColaboratorsToEqualization(colaboratorsToEqualization);
  }, [avaliationNotEvaluated]);

  async function getAllusers() {
    const responseGet = await api.get("/user");
    const colaborators = filtercolaborator(responseGet.data);
    // console.log("colaboradores:", colaborators);

    setFilteredColaborators(colaborators);
    setcolaborators(colaborators);
  }

  const filtercolaborator = (users: UserProps[]) => {
    return users.filter((user) => {
      return user.manager === false;
    });
  };

  // const filtercolaboratorByName = (name: string) => {
  //   // console.log("name:", name);

  //   const filteredColaborators = colaborators.filter(
  //     (colaborator) => {
  //       return colaborator.name.toLowerCase().includes(name.toLowerCase());
  //     }
  //   );
  //   // setColaboratorsToEqualization(filteredColaborators);

  //   // if (filteredColaborators.length === 0) {
  //   //   const colaboratorsToEqualization = linkAttributes(
  //   //     userNotEvaluated,
  //   //     assignmentNotEvaluated,
  //   //     avaliationNotEvaluated,
  //   //     userAssignmentsNotEvaluated.flat()
  //   //   );
  //   //   setColaboratorsToEqualization(colaboratorsToEqualization);
  //   // }
  // };

  const [filteredColaborators, setFilteredColaborators] = useState(
    [] as UserProps[]
  );
  const handleSearch = (query: string) => {
    console.log("filteredColaborators:", filteredColaborators);
    const lowercasedQuery = query.toLowerCase();
    const filtered = filteredColaborators.filter((user) =>
      user.name.toLowerCase().includes(lowercasedQuery)
    );
    console.log("filtered:", filtered);
    setFilteredColaborators(filtered);
  };

  function linkAttributes(
    users: any[],
    assignments: any[],
    avaliations: any[],
    associativeTable: any[]
  ): Result[] {
    const result: Result[] = [];

    users.forEach((user) => {
      const userAssignments = associativeTable.filter(
        (entry) => entry.userId === user.id
      );

      userAssignments.forEach((userAssignment) => {
        const assignment = assignments.find(
          (assignment) => assignment.id === userAssignment.assignmentId
        );

        if (assignment) {
          const userAvaliations = avaliations.filter(
            (avaliation) => avaliation.userAssignmentId === userAssignment.id
          );

          userAvaliations.forEach((avaliation) => {
            result.push({
              name: user.name,
              media: avaliation.media,
              dateConcluded: assignment.dateConcluded,
              userId: user.id,
              assignmentId: assignment.id,
            });
          });
        }
      });
    });

    return result;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Painel de controle</h2>
        <Perfil badge={false} />
      </div>
      <div className={styles.sectionOne}>
        <div className={styles.containerNewCicle}>
          <p className={styles.title}>Programe um novo ciclo:</p>
          <NewCicle
            programatedCicle={OpenAndCloseDates}
            getdate={handleDates}
            okClick={PostAssinmnet}
            trashClick={deleteAssignment}
          />
        </div>
        <div className={styles.containerSearchbar}>
          <p className={styles.title}>
            Para encontrar um colaborador específico, basta pesquisar:
          </p>
          <SearchBar onSearch={handleSearch} />
          <ul>
            {filteredColaborators.map((u) => (
              <li
                key={u.id}
                onClick={() => {
                  router.push(`/Resultados/${u.id}`);
                }}
              >
                {u.name} {u.id} 
              </li>
            ))}
          </ul>
        </div>
        {/* <div className={styles.containerSwitch}>
          <p>Controle manual dos ciclos de avaliação:</p>
          <ControlledSwitches getValues={handleChange} />
        </div> */}
      </div>

      <div>
        <p className={styles.title}>Colaboradores aptos para equalização:</p>
        <div className={styles.lineGrey}>
          <p className={`${styles.subtitle} ${styles.width}`}></p>
          <p className={`${styles.subtitle} ${styles.width}`}>
            Média de auto avaliação pessoal
          </p>
          <p className={`${styles.subtitle} ${styles.width}`}>
            Data de fechamento
          </p>
        </div>
        {colaboratorsToEqualization.map((avaliation, index) => (
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
                onClick={() => {
                  router.push(
                    `/equalizacao/${avaliation.userId}?assignmentId=${avaliation.assignmentId}`
                  );
                }}
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
