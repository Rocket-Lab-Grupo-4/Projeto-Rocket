"use client";

import React, { useEffect, useState } from "react";
import {
  fetchQuestions,
  fetchUserById,
  getAvaliation,
  createAvaliation,
  fetchUserAssignmentByUserAndAssignment,
} from "@/app/services/apiService";
import BlocoFormulario from "./BlocoFormulario";
import { useParams, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import { useSession } from "next-auth/react";

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [avaliationId, setAvaliationId] = useState<string | null>(null);

  //const [evaluatorId] = useState('clxtlggn60000cvzgissdxodd'); // id de colaborador
  // const [userAssignmentId] = useState<string>("clxtnd6ck0001pvd78ds4au1v"); // id do ciclo de avaliação para teste

  const params = useParams(); // Para obter o userId da rota dinâmica
  const searchParams = useSearchParams();

  const userId = String(params.id);
  const assignmentId = searchParams.get("assignmentId") ?? "";

  const { data: session } = useSession();

  const [evaluatorId] = useState(session?.user?.id);
  const [evaluatedId] = useState(userId);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const user = await fetchUserById(evaluatorId ?? "");
        setIsManager(user.manager);
        const avaliationType = user.manager
          ? "avaliationByManager"
          : evaluatorId === evaluatedId
          ? "autoAvaliation"
          : null;

        if (!avaliationType) throw new Error("Invalid evaluation type");

        const existingAvaliation = await getAvaliation(
          evaluatorId ?? "",
          evaluatedId
        );

        const response = await fetchUserAssignmentByUserAndAssignment(
          String(userId),
          assignmentId
        );

        const userAssignmentId = response.id;

        console.log("existingAvaliation:", existingAvaliation);

        debugger
        if (existingAvaliation) {
          console.log("Avaliação já existe:", existingAvaliation);
          setAvaliationId(existingAvaliation.id);
          // para funcionar a equalizaçao deve ver existingAvaliation[0].id
        } else {
          console.log("Avaliação não existe, criando...");
          
          const avaliationType =
            evaluatedId === evaluatorId
              ? "autoavaliation "
              : "avaliationbymanager";

          console.log(
            "avaliationType:",
            avaliationType,
            "userAssignmentId:",
            response.id,
            "evaluatorId:",
            evaluatorId,
            "evaluatedId:",
            evaluatedId
          );

          const avaliation = await api.post(`/avaliation/${evaluatorId}/${evaluatedId}`, {
            avaliationType,
            userAssignmentId,
            media: 0,
          });

          console.log(avaliation)
          console.log("Avaliação criada com sucesso:");
          // setAvaliationId(avaliation.data.id);
        }

        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error initializing page:", error);
      }
    };

    initializePage();
  }, [evaluatorId, evaluatedId]);

  const handleAnswerChange = (answer: number, justificative: string) => {
    console.log("Answer:", answer, "Justificative:", justificative);
  };

  const criteriosComportamentais = questions.slice(0, 5);
  const criteriosDeExecucao = questions.slice(5);

  return (
    <div>
      <div>
        <h3>Critérios Comportamentais:</h3>
        {criteriosComportamentais.map((question: any) => (
          <BlocoFormulario
            key={question.id}
            title={question.title}
            question={question.question}
            questionId={question.id}
            avaliationId={avaliationId}
            answerId={question.answerId}
            onAnswerChange={handleAnswerChange}
            isManager={isManager}
          />
        ))}

        <h3>Critérios de Execução:</h3>
        {criteriosDeExecucao.map((question: any) => (
          <BlocoFormulario
            key={question.id}
            title={question.title}
            question={question.question}
            questionId={question.id}
            avaliationId={avaliationId}
            answerId={question.answerId}
            onAnswerChange={handleAnswerChange}
            isManager={isManager}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
