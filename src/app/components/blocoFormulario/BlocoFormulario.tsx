"use client";

import { useState, useEffect } from "react";
import styles from './BlocoFormulario.module.scss';
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";
import { updateAnswer, getAnswers, createAnswer, calculateAvaliationMedia, updateAvaliationMedia } from "@/app/services/apiService";

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
          evaluatorId: 'clxtlggn60000cvzgissdxodd', //id de exemplo só para testar
          evaluatedId: 'clxtlggn60000cvzgissdxodd'
        });
        setExistingAnswer(response);
        fetchData()
        console.log('Answer created successfully')
      }

      if (avaliationId) {
        const media = await calculateAvaliationMedia(avaliationId);
        await updateAvaliationMedia(avaliationId, media);
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
            evaluatorId: 'clxtlggn60000cvzgissdxodd', 
            evaluatedId: 'clxtlggn60000cvzgissdxodd'  
          });
          setExistingAnswer(response);
          fetchData()
          console.log('Justification created successfully');
        }

        if (avaliationId) {
          const media = await calculateAvaliationMedia(avaliationId);
          await updateAvaliationMedia(avaliationId, media);
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