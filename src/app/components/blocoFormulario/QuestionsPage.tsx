"use client";

import React, { useEffect, useState } from 'react';
import { fetchQuestions, fetchUserById, getAvaliation, createAvaliation } from '@/app/services/apiService';
import BlocoFormulario from './BlocoFormulario';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [avaliationId, setAvaliationId] = useState<string | null>(null);

  //const [evaluatorId] = useState('cly3enmhc0000z7qhue9v2517'); // id de gestor
  const [evaluatorId] = useState('clxtlggn60000cvzgissdxodd'); // id de colaborador
  const [evaluatedId] = useState('clxtlggn60000cvzgissdxodd');
  const [userAssignmentId, setUserAssignmentId] = useState<string>('clxtnd6ck0001pvd78ds4au1v'); // id do ciclo de avaliação para teste

  useEffect(() => {
    const initializePage = async () => {
      try {

        const user = await fetchUserById(evaluatorId);
        setIsManager(user.manager);
        const avaliationType = user.manager
          ? 'avaliationByManager'
          : evaluatorId === evaluatedId
          ? 'autoAvaliation'
          : null;

        if (!avaliationType) throw new Error('Invalid evaluation type');

        const existingAvaliation = await getAvaliation(evaluatorId, evaluatedId);
        
        console.log("userAssignmentId antes da criação:", userAssignmentId);

        if (existingAvaliation) {
          debugger
          setAvaliationId(existingAvaliation.id);
        } else {
          debugger
          const avaliationResponse = await createAvaliation(evaluatorId, evaluatedId, userAssignmentId);
          console.log('Avaliação criada com sucesso')
          console.log(userAssignmentId)
          setAvaliationId(avaliationResponse.id);
        }


        const data = await fetchQuestions();
        setQuestions(data);


      } catch (error) {
        console.error('Error initializing page:', error);
      }
    };

    initializePage();
  }, [evaluatorId, evaluatedId, userAssignmentId]);

  const handleAnswerChange = (answer: number, justificative: string) => {
    console.log('Answer:', answer, 'Justificative:', justificative);
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