"use client";

import { useState } from "react";
import styles from './BlocoFormulario.module.scss'
import { BlocoFormularioProps } from "@/app/interfaces/Formulario";

const BlocoFormulario: React.FC<BlocoFormularioProps> = ({title, description, onResponseChange}) => {

    const [response, setResponse] = useState<number | null>(null);
    const [justification, setJustification] = useState('');


    const handleResponseChange = (value: number) => {

        setResponse(value);
        onResponseChange(value, justification);
    }

    const handleJustificationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        const value = event.target.value;
        setJustification(value);

        if (response !== null) {
            onResponseChange(response, value)
        }
    }

    return (

        <div className={styles.blocoFormulario}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.responseOptions}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value}>
                        <input
                        type="radio"
                        name="response"
                        value={value}
                        checked={response === value}
                        onChange={() => handleResponseChange} />
                        
                    {value}
                    </label>
                ))
                }
            </div>

            <textarea 
                placeholder="Escreva sua justificativa aqui..."
                value={justification}
                onChange={handleJustificationChange}
            
            />

        </div>
    )

}

export default BlocoFormulario;





