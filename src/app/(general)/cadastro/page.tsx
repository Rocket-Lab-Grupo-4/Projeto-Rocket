"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Cadastro.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { CadastroProps } from "@/app/interfaces/Cadastro";
import api from "@/utils/api";
import useForm from "@/app/hooks/useForm";
import useLoading from "@/app/hooks/useLoading";
import { UserProps } from "@/app/interfaces/user";
import FormFields from "@/app/components/FormFields/FormFields";
import { BlueButton, GreenButton } from "@/app/components/buttons/button";

const initialFormValues: Omit<UserProps, "id" | "manager"> = {
  image: "",
  name: "",
  office: "",
  dateNaissance: "",
  rg: "",
  adress: "",
  ctps: "",
  issuingBody: "",
  number: "",
  cpf: "",
  cep: "",
  complement: "",
};

const Cadastro: React.FC<CadastroProps & { onSuccess: () => void }> = ({
  onToggleForm,
  onSuccess,
}) => {
  const router = useRouter();
  const { formData, handleChange } = useForm(initialFormValues);

  const {
    loading,
    message,
    isError,
    startLoading,
    stopLoading,
    setMessageWithError,
  } = useLoading();

  const handleSubmit = async () => {
    startLoading();
    const data = {
      ...formData,
      manager: false,
    };

    try {
      const response = await api.post("/user", data);
      if (response.status === 201) {
        setMessageWithError("Cadastro realizado com sucesso!", false);
        console.log("Response data:", response.data);
        setTimeout(() => {
          onSuccess();
          router.push("/home");
        }, 2000);
      } else {
        setMessageWithError(
          `Erro ao realizar cadastro: ${response.statusText}`,
          true
        );
        console.error("Erro ao realizar cadastro:", response);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao realizar cadastro. Tente novamente mais tarde.";
      setMessageWithError(errorMessage, true);
      console.error("Erro ao realizar cadastro", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <div className={styles.speechBubble} />
        <div className={styles.cadastroTitle}>
          <span>É novo aqui?</span> Faça seu cadastro:
        </div>
        <div className={styles.gridContainer}>
          <FormFields formData={formData} handleChange={handleChange} />
        </div>
        {message && (
          <p className={`${styles.message} ${isError ? styles.error : ""}`}>
            {message}
          </p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: "20px",
            marginRight: "50px",
          }}
        >
          <BlueButton
            onClick={onToggleForm}
            disabled={loading}
            width="108px"
            height="30px"
          >
            Cancelar
          </BlueButton>
          <GreenButton
            onClick={handleSubmit}
            disabled={loading}
            width="108px"
            height="30px"
          >
            {loading ? <CircularProgress size={24} /> : "Cadastrar"}
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
