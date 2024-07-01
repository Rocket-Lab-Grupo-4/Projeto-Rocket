"use client";

import React, { useEffect, useState } from 'react';
import { fetchQuestions, fetchUserById, getAvaliation, createAvaliation } from '@/app/services/apiService';
import BlocoFormulario from './BlocoFormulario';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const [avaliationId, setAvaliationId] = useState<string | null>(null);
  const [evaluatorId] = useState('clxtlggn60000cvzgissdxodd'); // ids só para teste
  const [evaluatedId] = useState('clxtlggn60000cvzgissdxodd');
  const [assignmentId] = useState('clxyzhudc0000uoik63rg8pni'); // id do ciclo de avaliação para teste

  useEffect(() => {
    const initializePage = async () => {
      try {

        const user = await fetchUserById(evaluatorId);
        const avaliationType = user.manager
          ? 'avaliationByManager'
          : evaluatorId === evaluatedId
          ? 'autoAvaliation'
          : null;

        if (!avaliationType) throw new Error('Invalid evaluation type');

        const existingAvaliation = await getAvaliation(evaluatorId, evaluatedId);

        if (existingAvaliation) {
          setAvaliationId(existingAvaliation.id);
        } else {
          const avaliationResponse = await createAvaliation(evaluatorId, evaluatedId, assignmentId);
          setAvaliationId(avaliationResponse.id);
        }


        const data = await fetchQuestions();
        setQuestions(data);


      } catch (error) {
        console.error('Error initializing page:', error);
      }
    };

    initializePage();
  }, [evaluatorId, evaluatedId, assignmentId]);

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
        />
      ))}
    </div>
    </div>
  );
};

export default QuestionsPage;