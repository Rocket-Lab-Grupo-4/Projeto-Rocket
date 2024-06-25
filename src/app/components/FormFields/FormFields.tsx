import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormFieldsProps } from "@/app/interfaces/FormFiels";
import styles from "@/app/(general)/cadastro/Cadastro.module.scss";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "#F1F1F1",
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
  },
});

const FormFields: React.FC<FormFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      {[
        { label: "Nome completo", name: "name" },
        { label: "Data de nascimento", name: "dateNaissance" },
        { label: "N° do CPF", name: "cpf" },
        { label: "N° da Carteira de Trabalho", name: "ctps" },
        { label: "N° do documento de identificação com foto", name: "rg" },
        { label: "Orgão emissor", name: "issuingBody" },
        { label: "Endereço", name: "adress" },
        { label: "CEP", name: "cep" },
        { label: "Número", name: "number" },
        { label: "Complemento", name: "complement" },
        { label: "Foto de perfil", name: "image" },
        { label: "Cargo", name: "office" },
        { label: "Escolha uma senha", name: "password"}
      ].map((field, index) => (
        <div className={styles.fieldGroup} key={index}>
          <div className={styles.cadastroText}>{field.label}:</div>
          <CustomTextField
            name={field.name}
            value={(formData as any)[field.name] || ""}
            className={styles.textFieldFull}
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
          />
        </div>
      ))}
    </>
  );
};

export default FormFields;
