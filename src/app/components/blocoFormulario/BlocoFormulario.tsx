"use client";

import { useState } from "react";
import styles from './BlocoFormulario.module.scss';
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";
import { updateAnswer } from "@/app/services/apiService";

const BlocoFormulario: React.FC<BlocoFormularioProps> = ({ title, question, questionId, avaliationId, answerId, onAnswerChange }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [justificative, setJustificative] = useState('');

  const handleAnswerChange = async (value: number) => {
    setAnswer(value);
    onAnswerChange(value, justificative);

    try {
      await updateAnswer({
        answerId,
        questionId,
        avaliationId,
        answer: value,
        justificative
      });
      console.log('Answer updated successfully');
    } catch (error) {
      console.error('Failed to update answer:', error);
    }
  };

  
  const handleJustificativeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJustificative(value);

    if (answer !== null) {
      onAnswerChange(answer, value);

      try {
        updateAnswer({
          answerId,
          questionId,
          avaliationId,
          answer,
          justificative: value
        });
        console.log('Justification updated successfully');
      } catch (error) {
        console.error('Failed to update justification:', error);
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
              name="answer"
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