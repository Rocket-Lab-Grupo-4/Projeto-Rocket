"use client";

import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '@/app/services/apiService';
import BlocoFormulario from './BlocoFormulario';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    getQuestions();
  }, []);

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
          questionId={question.questionId}
          avaliationId={question.avaliationId}
          answerId={question.answerId}
          onAnswerChange={handleAnswerChange}   />
      ))}

      <h3>Critérios de Execução:</h3>
      {criteriosDeExecucao.map((question: any) => (
        <BlocoFormulario
          key={question.id}
          title={question.title}
          question={question.question}
          questionId={question.questionId}
          avaliationId={question.avaliationId}
          answerId={question.answerId}
          onAnswerChange={handleAnswerChange} 
        />
      ))}
    </div>
    </div>
  );
};

export default QuestionsPage;