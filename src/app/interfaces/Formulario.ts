export interface BlocoFormularioProps {
    
    title: string;
    question: string;
    questionId: string;
    avaliationId: string | null;
    answerId: string;
    isManager: boolean;
    onAnswerChange: (answer: number, justificative: string) => void;
}