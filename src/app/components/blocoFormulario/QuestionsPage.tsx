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

  const handleResponseChange = (response: number, justification: string) => {
    console.log('Response:', response, 'Justification:', justification);
  };

  return (
    <div>
      {questions.map((question: any) => (
        <BlocoFormulario
          key={question.id}
          title={question.title}
          description={question.description}
          onResponseChange={handleResponseChange}
        />
      ))}
    </div>
  );
};

export default QuestionsPage;