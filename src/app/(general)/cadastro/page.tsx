"use client";
import React from "react";
import styles from "./Cadastro.module.scss";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CadastroProps } from "@/app/interfaces/Cadastro";

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

const Cadastro: React.FC<CadastroProps> = ({ onToggleForm }) => {
  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <div className={styles.speechBubble}></div>
        <div className={styles.cadastroTitle}>
          <span>É novo aqui?</span> Faça seu cadastro:
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Nome completo:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Data de nascimento:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>N° do CPF:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Foto de perfil:</div>
            <div className={styles.inputGroup}>
              <CustomTextField
                className={styles.textFieldFull}
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>
              N° do documento de identificação com foto:
            </div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>
              N° da Carteria de Trabalho:
            </div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Cargo:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Orgão emissor:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Endereço:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>CEP:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Número:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.cadastroText}>Complemento:</div>
            <CustomTextField
              className={styles.textFieldFull}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>
        </div>
        <p className={styles.haveAccount}>
          Já possui uma conta?{" "}
          <strong className={styles.haveAccountClick} onClick={onToggleForm}>
            Entre aqui!
          </strong>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: "680px",
            marginRight: "50px",
          }}
        >
          <Button className={styles.cadastroCancel} onClick={onToggleForm}>
            Cancelar
          </Button>
          <Button className={styles.cadastroButton}>Cadastrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
