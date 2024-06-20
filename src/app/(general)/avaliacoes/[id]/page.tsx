"use client";
import Perfil from "@/app/components/perfil/perfil";
import SpeechBubble from "@/app/components/speechBubble/bubble";
import BasicTabs from "@/app/components/tabs/tabs";
import OpenAvaliation from "./open";
import CloseAvaliation from "./close";
import { BlueButton } from "@/app/components/buttons/button";

function historicAvaliation() {
  return (
    <>
      <Perfil name={"Maria"} badge={true} />
      <SpeechBubble>
        Olá! Você tem um ciclo de avaliação em aberto.
        <BlueButton width='fit-content' height='fit-content'>Clique para visualizar</BlueButton>
      </SpeechBubble>
      <BasicTabs>
        <OpenAvaliation />
        <CloseAvaliation />
      </BasicTabs>
    </>
  );
}

export default historicAvaliation;
