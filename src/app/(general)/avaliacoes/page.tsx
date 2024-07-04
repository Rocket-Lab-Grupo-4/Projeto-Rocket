"use client";
import Perfil from "@/app/components/perfil/perfil";
import styles from "./historico.module.scss";
import {
  SpeechBubble,
  SpeechBubbleBig,
} from "@/app/components/speechBubble/bubble";
import BasicTabs from "@/app/components/tabs/tabs";
import OpenAvaliation from "./open";
import CloseAvaliation from "./close";
import { BlueButtonColorWhite } from "@/app/components/buttons/button";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { userAssignment } from "@/app/interfaces/userAssignment";
import { assignment } from "@/app/interfaces/assignment";
import { useFetchAssignments } from "@/app/hooks/useFetchAssignmnet";

export type UnionStatusAndAssignment = {
  id: string;
  assignmentId: string;
  dataAnswered?: string;
  dateConcluded: string;
  status: boolean;
  type: string;
  userId: string;
};

const userId = "clxtlggn60000cvzgissdxodd";

function HistoricAvaliation() {
  const [assignments, setAssignments] = useState<UnionStatusAndAssignment[]>(
    []
  );
  const [assignmentToDo, setAssignmentToDo] = useState<boolean>(false);
  const today = new Date();

  const { fecthAssignmentsByUser, getAllAssignments } = useFetchAssignments();

  const getStatusFromUserAssignments = (assignments: userAssignment[]) => {
    return assignments.map((assignment) => assignment.status);
  };

  const verifyIfhaveFalseStatus = (status: boolean[]) => {
    return status.some((s) => s === false);
  };

  const filterOpenAvaliations = (assignments: UnionStatusAndAssignment[]) => {
    return assignments.filter((assignment) => {
      return assignment.dateConcluded > today.toISOString();
    });
  };

  const filterCloseAvaliations = (assignments: UnionStatusAndAssignment[]) => {
    return assignments.filter((assignment) => {
      return assignment.dateConcluded < today.toISOString();
    });
  };

  const unionStatusFromAssignmentAndUserWithAssignmentsById = (
    assignments: userAssignment[],
    fetchedAssignments: assignment[]
  ) => {
    return assignments.map((au) => {
      const assignment = fetchedAssignments.find(
        (a) => a.id === au.assignmentId
      );
      return {
        ...au,
        ...assignment,
        dateConcluded: assignment?.dateConcluded || "",
        type: assignment?.type || "", // Add a default value for the 'type' property
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const assignmentsByUser = await fecthAssignmentsByUser(userId);
      const assignmentIds = assignmentsByUser.map((au) => au.assignmentId);
      const fetchedAssignments = await getAllAssignments(assignmentIds);

      const status = getStatusFromUserAssignments(assignmentsByUser);
      setAssignmentToDo(verifyIfhaveFalseStatus(status));

      const UnionAssignmentsByUser =
        unionStatusFromAssignmentAndUserWithAssignmentsById(
          assignmentsByUser,
          fetchedAssignments
        );

      setAssignments(UnionAssignmentsByUser);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Perfil name={"Maria"} badge={true} />
      </div>
      {assignmentToDo ? (
        <SpeechBubbleBig>
          Olá! Você tem um ciclo de avaliação em aberto.
          <BlueButtonColorWhite
            width="fit-content"
            height="fit-content"
            borderRadius="9px"
          >
            Clique para visualizar
          </BlueButtonColorWhite>
        </SpeechBubbleBig>
      ) : (
        <SpeechBubble>
          Sua média no último ciclo foi de: 5.0! Baixe o relatório para mais
          detalhes
        </SpeechBubble>
      )}

      <BasicTabs>
        <OpenAvaliation avaliations={filterOpenAvaliations(assignments)} />
        <CloseAvaliation avaliations={filterCloseAvaliations(assignments)} />
      </BasicTabs>
    </div>
  );
}

export default HistoricAvaliation;
