"use client";

import { useState, useEffect } from "react";
import styles from './BlocoFormulario.module.scss';
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";
import Link from "next/link";
import { updateAnswer, getAnswersByEvaluatedId, createAnswer, calculateAvaliationMedia, updateAvaliationMedia } from "@/app/services/apiService";
import useActiveLink from "@/app/hooks/useActiveLink";

const BlocoFormulario: React.FC<BlocoFormularioProps> = ({ title, question, questionId, isManager, avaliationId, answerId, onAnswerChange }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [justificative, setJustificative] = useState('');
  const [existingAnswer, setExistingAnswer] = useState<any | null>(null)
  const [currentAvaliationId, setCurrentAvaliationId] = useState('');

  const evaluatorId = 'clxtlh00m0001cvzgd7gq1tjl' // id de gestor
  //const evaluatorId = 'clxtlggn60000cvzgissdxodd'; // id de colaborador
  const evaluatedId = 'clxtlggn60000cvzgissdxodd'

  const autoAnswer = 4; // valor de exemplo

  const { activeLink, handleLinkClick } = useActiveLink();

  const fetchData = async () => {
    try {
      const data = await getAnswersByEvaluatedId({ questionId, avaliationId, evaluatedId });
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
  }, [questionId, avaliationId, evaluatedId]);

  useEffect(() => {
    if (currentAvaliationId) {
      updateMedia(currentAvaliationId);
    }
  }, [currentAvaliationId]); 


    
  const updateMedia = async (avaliationId: string) => {
    try {
      const media = await calculateAvaliationMedia(avaliationId);
      await updateAvaliationMedia(avaliationId, media);
      console.log(`Media updated: ${media}`);
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

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
        setCurrentAvaliationId(existingAnswer.avaliationId)
        console.log('Answer updated successfully');
      } else {
        const response = await createAnswer({
          answer: value,
          justificative, 
          avaliationId,
          questionId,
          evaluatorId,
          evaluatedId
        });
        setExistingAnswer(response);
        setCurrentAvaliationId(response.avaliationId)
        fetchData()
        console.log('Answer created successfully')
      }
      fetchData()
  
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
          setCurrentAvaliationId(existingAnswer.avaliationId)
          console.log('Justification updated successfully');
        } else {
          const response = await createAnswer({
            answer: answer!,
            justificative: value,
            avaliationId,
            questionId,
            evaluatorId, 
            evaluatedId 
          });
          setExistingAnswer(response);
          setCurrentAvaliationId(response.avaliationId)
          fetchData()
          console.log('Justification created successfully');
        }

        fetchData()
      } catch (error) {
        console.error('Failed to update or create justification:', error);
      }
    }
  };

  return (
    <div className={styles.blocoFormulario}>
      <h3>{title}</h3>


      {/* tela para o gestor */}
      {isManager && (

        <>
        <p>Nesse critério, o colaborador se avaliou com nota {autoAnswer}</p>
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
            <div className={styles.footerButtons}>
                <button className={styles.cancelButton}>Cancelar</button>
                <Link href='/home'>
                  <button className={styles.submitButton}>Enviar</button>
                </Link>
            </div>
      </>
      )}

      {/* tela para o colaborador   */}

      {!isManager && (

        <>
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
            <div className={styles.footerButtons}>
                <button className={styles.cancelButton}>Cancelar</button>
                <Link href='/home'>
                  <button className={styles.submitButton}>Enviar</button>
                </Link>
            </div>
        </>
      )}
      
    </div>
  );
};

export default BlocoFormulario;