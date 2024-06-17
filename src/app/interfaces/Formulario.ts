export interface BlocoFormularioProps {
    
    title: string;
    description: string;
    onResponseChange: (response: number, justification: string) => void;
}