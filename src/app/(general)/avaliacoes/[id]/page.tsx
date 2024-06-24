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
import { BlueButton } from "@/app/components/buttons/button";
import { avaliation } from "@/app/interfaces/avaliation";
import { use, useEffect, useState } from "react";
import api from "@/utils/api";
import { userAssignment } from "@/app/interfaces/userAssignment";
import { assignment } from "@/app/interfaces/assignment";

const userId = "clxq9oq9y0000ngms1y6ixony";

function HistoricAvaliation() {
  const [assignments, setAssignments] = useState<assignment[]>([]);
  const [assignmentToDo, setAssignmentToDo] = useState<boolean>(false);
  const today = new Date();

  const fecthAssignmentsByUser = async () => {
    const response = await api.get(`/user-assignment/user/${userId}`);
    return response.data as userAssignment[];
  };

  const getAllAssignments = async (assignmentIds: string[]) => {
    const assignmentPromises = assignmentIds.map((id) =>
      api.get(`/assignment/assignment/${id}`)
    );
    const assignmentsResponses = await Promise.all(assignmentPromises);
    return assignmentsResponses.map((res) => res.data) as assignment[];
  };

  const getAllStatusFromAssignments = (assignments: assignment[]) => {
    return assignments.map((assignment) => {
      return assignment.status;
    });
  };

  const verifyIfhaveFalseStatus = (status: boolean[]) => {
    return status.some((s) => s === false);
  };

  const filterOpenAvaliations = (assignments: assignment[]) => {
    return assignments.filter((assignment) => {
      return assignment.dateConcluded > today.toISOString();
    });
  };

  const filterCloseAvaliations = (assignments: assignment[]) => {
    return assignments.filter((assignment) => {
      return assignment.dateConcluded < today.toISOString();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const assignmentsByUser = await fecthAssignmentsByUser();
      const assignmentIds = assignmentsByUser.map((au) => au.assignmentId);
      const fetchedAssignments = await getAllAssignments(assignmentIds);
      setAssignments(fetchedAssignments);

      const status = getAllStatusFromAssignments(fetchedAssignments);
      setAssignmentToDo(verifyIfhaveFalseStatus(status));
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
          <BlueButton width="fit-content" height="fit-content">
            Clique para visualizar
          </BlueButton>
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
