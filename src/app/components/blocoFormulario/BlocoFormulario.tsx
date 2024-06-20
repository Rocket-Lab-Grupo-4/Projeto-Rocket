"use client";

import { useState, useEffect } from "react";
import styles from './BlocoFormulario.module.scss';
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";
import { updateAnswer, getAnswers, createAnswer } from "@/app/services/apiService";

const BlocoFormulario: React.FC<BlocoFormularioProps> = ({ title, question, questionId, avaliationId, answerId, onAnswerChange }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [justificative, setJustificative] = useState('');
  const [existingAnswer, setExistingAnswer] = useState<any | null>(null)

  const fetchData = async () => {
    try {
      const data = await getAnswers({ questionId, avaliationId });
      const answerData = data.find((item: any) => item.questionId === questionId)
      if (answerData) {
        setExistingAnswer(answerData);
        setAnswer(answerData.answer);
        setJustificative(answerData.justificative);
      } else {
        setExistingAnswer(null);
      }
    } catch (error) {
      console.error('Error fetching existing answer:', error);
    }
  };

  useEffect(() => {
      fetchData();
  }, [questionId, avaliationId]);


  const handleAnswerChange = async (value: number) => {
    setAnswer(value);
    onAnswerChange(value, justificative);

    try {
      
      if (existingAnswer && existingAnswer.id != null && existingAnswer.questionId === questionId) {
        await updateAnswer({
          answerId: existingAnswer.id,
          questionId, 
          avaliationId, 
          answer: value, 
          justificative
        });
        fetchData()
        console.log('Answer updated successfully');
      } else {
        const response = await createAnswer({
          answer: value,
          justificative, 
          avaliationId,
          questionId,
          evaluatorId: 'clx9wto3v0000ay3zcxeddxto',
          evaluatedId: 'clx9wto3v0000ay3zcxeddxto'
        });
        setExistingAnswer(response);
        fetchData()
        console.log('Answer created successfully')
      }
    } catch (error) {
      console.error('Failed to update or create answer:', error);
    }
  }

  
  const handleJustificativeChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    const value = event.target.value;
    setJustificative(value);

    if (answer !== null) {
      onAnswerChange(answer, value);

      try {
        if (existingAnswer && existingAnswer.id != null && existingAnswer.questionId === questionId) {
          await updateAnswer({
            answerId: existingAnswer.id,
            questionId,
            avaliationId,
            answer,
            justificative: value
          });
          fetchData()
          console.log('Justification updated successfully');
        } else {
          const response = await createAnswer({
            answer: answer!,
            justificative: value,
            avaliationId,
            questionId,
            evaluatorId: 'clx9wto3v0000ay3zcxeddxto', 
            evaluatedId: 'clx9wto3v0000ay3zcxeddxto'  
          });
          setExistingAnswer(response);
          fetchData()
          console.log('Justification created successfully');
        }
      } catch (error) {
        console.error('Failed to update or create justification:', error);
      }
    }
  };

  return (
    <div className={styles.blocoFormulario}>
      <h3>{title}</h3>
      <p>{question}</p>
      <div className={styles.responseOptions}>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={questionId}
              value={value}
              checked={answer === value}
              onChange={() => handleAnswerChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <textarea 
        placeholder="Escreva sua justificativa aqui..."
        value={justificative}
        onChange={handleJustificativeChange}
      />
    </div>
  );
};

export default BlocoFormulario;