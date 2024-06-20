import styles from "./bubble.module.scss";
import { Bubble } from "@/app/assets";
import Image from "next/image";
import React from "react";

interface SpeechBubbleProps {
  children: React.ReactNode;
}

function SpeechBubble({ children }: SpeechBubbleProps) {
  return (
    <>
      <div className={styles.baloonContainer}>
        <Image
          src={Bubble}
          alt="Balão de fala"
          className={styles.baloonImage}
          width={500}
        />
        <p className={styles.baloonText}>{children}</p>
      </div>
    </>
  );
}

export default SpeechBubble;
