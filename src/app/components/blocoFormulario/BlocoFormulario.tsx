"use client";

import { useState, useEffect } from "react";
import styles from './BlocoFormulario.module.scss';
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";
import Link from "next/link";
import { updateAnswer, getAnswersByEvaluatedId, createAnswer, calculateAvaliationMedia, updateAvaliationMedia, getAvaliation, createAvaliation, deleteAnswer, getAnswersByAvaliationId } from "@/app/services/apiService";
import useActiveLink from "@/app/hooks/useActiveLink";
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { PopUpV, PopUpX } from '@/app/assets';

const BlocoFormulario: React.FC<BlocoFormularioProps> = ({ title, question, questionId, isManager, avaliationId, answerId, onAnswerChange }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [autoAnswer, setAutoAnswer] = useState()
  const [justificative, setJustificative] = useState('');
  const [existingAnswer, setExistingAnswer] = useState<any | null>(null)
  const [currentAvaliationId, setCurrentAvaliationId] = useState<string>('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState('');

  // const evaluatorId = 'clxtlh00m0001cvzgd7gq1tjl' // id de gestor
  // const evaluatorId = 'clxtlggn60000cvzgissdxodd'; // id de colaborador
  // const evaluatedId = 'clxtlggn60000cvzgissdxodd'
  // const [userAssignmentId, setUserAssignmentId] = useState<string>('clxtnd6ck0001pvd78ds4au1v'); // id do ciclo de avaliação para teste

  // const { activeLink, handleLinkClick } = useActiveLink();

  const { data: session } = useSession();
  const { id } = useParams();
  const evaluatorId =  String(session?.user?.id);
  const evaluatedId = String(id);


  const fetchData = async () => {
    
    try {
      let answerData;

      if (!isManager) {
        const data = await getAnswersByEvaluatedId({ questionId, avaliationId, evaluatedId });
        answerData = data.find((item: any) => item.questionId === questionId
        && item.avaliationId === avaliationId
        && item.evaluatedId === evaluatedId
        // para funcionar a equalizaçao deve ver evaluator
        );
      } else {
        // const data = await getAnswersByEvaluatedId({ questionId, avaliationId, evaluatedId });
        // console.log('data:', data)
        // const answers = await getAnswersByAvaliationId(data[0].avaliationId);

        // console.log('answers:', answers)

          const previousAnswers = await getAnswersByEvaluatedId({ questionId, avaliationId, evaluatedId });      
          answerData = previousAnswers.find((answer: Answer) => 
            answer.questionId === questionId
            && answer.avaliationId === avaliationId
        );

        const data = await getAnswersByEvaluatedId({ questionId, avaliationId, evaluatedId });
        const colaboratornswerData = data.find((item: any) => item.questionId === questionId
        && item.avaliationId === avaliationId
        && item.evaluatedId === evaluatedId
        // para funcionar a equalizaçao deve ver evaluator
        );



        // console.log('colaboratornswerData:', colaboratornswerData)
        // setAutoAnswer(colaboratornswerData.answer);

        // answerData = data.find((item: any) => item.questionId === questionId
        // && item.avaliationId === avaliationId
        
        // // para funcionar a equalizaçao deve ver evaluator
        // );
      }

      if (answerData) {
        setHasAnswer(true)
      }
  
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

  
  const handleDiscard = async () => {
    


      try {
        const answers = await getAnswersByAvaliationId(currentAvaliationId);
        for (const answer of answers) {
          await deleteAnswer(answer.id);
        }
        console.log('All answers discarded successfully');
        setAnswer(null);
        setExistingAnswer(null);
        updateMedia(currentAvaliationId);
        fetchData()
      } catch (error) {
        console.error('Failed to discard answers:', error);
      }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    const answers = await getAnswersByAvaliationId(currentAvaliationId);
    if (answers.length < 9) {
      setPopupImage(PopUpX.src); 
      setShowPopup(true);
      setTimeout(closePopup, 2000);

    } else {
      setPopupImage(PopUpV.src); 
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        window.location.href = '/Home'; 
      }, 1500); 
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

  useEffect(() => {
    const initializeAvaliation = async () => {
      try {
        const avaliation = await getAvaliation(evaluatorId, evaluatedId);
        setCurrentAvaliationId(avaliation.id); 
      } catch (error) {
        console.error('Error initializing avaliation:', error);
      }
    };
  
    initializeAvaliation();
  }, [evaluatorId, evaluatedId]);
  // , userAssignmentId

  interface Answer {
    questionId: string;
    avaliationId: string;
    evaluatorId: string;
    answer: number;
  }

  useEffect(() => {
    const fetchPreviousAnswer = async () => {
      const avaliationsByCollaborator = await getAvaliation(evaluatedId, evaluatedId);
      const answers = await getAnswersByAvaliationId(avaliationsByCollaborator.id)
      const previousAnswer = answers.find((answer: Answer) => answer.questionId === questionId);

      setAutoAnswer(previousAnswer.answer);
    };
  
    if (isManager) fetchPreviousAnswer();
  }, [questionId, avaliationId, evaluatedId, isManager]);

    
  const updateMedia = async (avaliationId: string) => {
    try {
      const media = await calculateAvaliationMedia(avaliationId);
      await updateAvaliationMedia(avaliationId, media);
      // console.log(`Media updated: ${media}`);
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
        updateMedia(currentAvaliationId)
        console.log('Answer updated successfully');
      } else {
        const responseCreate = await createAnswer({
          answer: value,
          justificative, 
          avaliationId,
          questionId,
          evaluatorId,
          evaluatedId
        });
        // console.log('Response create:', responseCreate)
        // updateMedia('cly6bxxht000091e5u6mo72df')
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
      

      {showPopup && (
      <div className={styles.popup}>
        <img src={popupImage} alt="Popup" />
      </div>
    )}

      <div className={styles.header}>
      <h3>{title}</h3>
      {hasAnswer ? (
                    <img src="/assets/imageMarked.png" alt="Respondido" className={styles.statusIcon} />
                ) : (
                    <img src="/assets/imageUnmarked.png" alt="Não Respondido" className={styles.statusIcon}/>
                )}
      </div>

      {/* tela para o gestor */}
      {isManager && (

        <>
        <p>Nesse critério, o colaborador se avaliou com nota <b>{autoAnswer}</b></p>
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
              <button className={styles.discardButton} onClick={handleDiscard}>Descartar</button>
              <button className={styles.submitButton} onClick={handleSubmit}>Enviar</button>
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
                <button className={styles.discardButton} onClick={handleDiscard}>Descartar</button>
                <button className={styles.submitButton} onClick={handleSubmit}>Enviar</button>
            </div>
        </>
      )}
      
    </div>
  );
};

export default BlocoFormulario;