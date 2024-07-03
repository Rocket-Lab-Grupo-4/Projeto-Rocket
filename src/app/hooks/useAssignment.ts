import { useCallback, useState } from 'react';
import { assignment } from "@/app/interfaces/assignment";
import { api } from "../services/apiService";

export const UseAssignment = () => {
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

  function PostAssinmnet( openDate: string, closeDate: string) {
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

  return { getAssignment, OpenAndCloseDates, PostAssinmnet, deleteAssignment };
};
