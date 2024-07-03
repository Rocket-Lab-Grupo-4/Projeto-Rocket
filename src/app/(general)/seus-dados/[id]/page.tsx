"use client";
import React, { useEffect, useState } from "react";
import styles from "./Datas.module.scss";
import { UserProps } from "@/app/interfaces/user";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { BlueButton, GreenButton } from "@/app/components/buttons/button";
import { formatDate } from "@/utils/formatDate";
import { InputTextField } from "@/app/components/inputs";

const userId = "clxtlggn60000cvzgissdxodd";

export default function SeusDados() {
  const params = useParams();
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [updatedUser, setUpdatedUser] = useState<UserProps>({} as UserProps);
  const [isEditing, setIsEditing] = useState(false);

  // get initial data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get(`/user/${userId}`);
      const user = response.data;
      setUser(user);
      setUpdatedUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  // patch data
  const handleInputChange = (field: keyof UserProps, newValue: string) => {
    setUpdatedUser({ ...updatedUser, [field]: newValue });
  };

  const handleSave = async () => {
    try {
      await api.patch(`/user/${params.id}`, updatedUser);
      console.log("Dados atualizados com sucesso!");
      setIsEditing(false); // Desabilitar edição após salvar
    } catch (error) {
      alert("Erro ao atualizar dados");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Seus dados</h2>
      </div>
      {/* 1 bloco */}
      <div>
        <div className={styles.profileImage}>
          <img
            src={
              user.image ??
              "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="Profile"
          />
        </div>
        <div className={styles.inLineNoGap}>
          <h3 className={styles.title}>Nome: &nbsp;</h3>
          <p className={styles.text}>{user.name}</p>
        </div>
        <div className={styles.inLineNoGap}>
          <h3 className={styles.title}>Cargo &nbsp;</h3>
          <p>{user.office}</p>
        </div>
      </div>

      {/* 2 bloco */}
      <div className={styles.inLine}>
        {/* column 1 */}
        <div className={styles.inColumn}>
          <div>
            <h3 className={styles.title}>Data de nascimento: &nbsp;</h3>
            <InputTextField
              value={formatDate(updatedUser.dateNaissance)}
              onChange={(newValue) =>
                handleInputChange("dateNaissance", newValue)
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <h3 className={styles.title}>CTPS: &nbsp;</h3>
            <InputTextField
              value={updatedUser.ctps}
              onChange={(newValue) => handleInputChange("ctps", newValue)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <h3 className={styles.title}>N° do CPF: &nbsp;</h3>
            <InputTextField
              value={updatedUser.cpf}
              onChange={(newValue) => handleInputChange("cpf", newValue)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* column 2 */}
        <div className={styles.inColumn}>
          <div>
            <h3 className={styles.title}>Registro Geral: &nbsp;</h3>
            <InputTextField
              value={updatedUser.rg}
              onChange={(newValue) => handleInputChange("rg", newValue)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <h3 className={styles.title}>Orgão emissor: &nbsp;</h3>
            <InputTextField
              value={updatedUser.issuingBody}
              onChange={(newValue) =>
                handleInputChange("issuingBody", newValue)
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <h3 className={styles.title}>CEP: &nbsp;</h3>
            <InputTextField
              value={updatedUser.cep}
              onChange={(newValue) => handleInputChange("cep", newValue)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* column 3 */}
        <div className={styles.inColumn}>
          <div>
            <h3 className={styles.title}>Endereço: &nbsp;</h3>
            <InputTextField
              value={updatedUser.adress}
              onChange={(newValue) => handleInputChange("adress", newValue)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <h3 className={styles.title}>Número: &nbsp;</h3>
            <InputTextField
              value={updatedUser.number}
              onChange={(newValue) => handleInputChange("number", newValue)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <h3 className={styles.title}>Complemento: &nbsp;</h3>
            <InputTextField
              value={updatedUser.complement}
              onChange={(newValue) => handleInputChange("complement", newValue)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      <div className={styles.ButtonsContainer}>
        <BlueButton width="108px" height="30px" onClick={toggleEdit}>
          Editar
        </BlueButton>
        <GreenButton
          width="108px"
          height="30px"
          onClick={handleSave}
          disabled={!isEditing}
        >
          Salvar
        </GreenButton>
      </div>
    </div>
  );
}
