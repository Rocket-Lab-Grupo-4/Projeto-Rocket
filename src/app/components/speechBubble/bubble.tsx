import styles from "./bubble.module.scss";
import { Bubble, BubbleBig } from "@/app/assets";
import Image from "next/image";
import React from "react";

interface SpeechBubbleProps {
  children: React.ReactNode;
  big?: boolean;
}

function SpeechBubble({ children, big }: SpeechBubbleProps) {
  return (
    <>
      <div className={styles.baloonContainer}>
        <Image
          src={Bubble}
          alt="Balão de fala"
          className={styles.baloonImage}
        />
        <p className={styles.baloonText}>{children}</p>
      </div>
    </>
  );
}

function SpeechBubbleBig({ children }: SpeechBubbleProps) {
  return (
    <>
      <div className={styles.baloonContainer}>
        <Image
          src={BubbleBig}
          alt="Balão de fala"
          className={styles.baloonImage}
          width={890}
        />
        <p className={styles.baloonText}>{children}</p>
      </div>
    </>
  );
}

export { SpeechBubble, SpeechBubbleBig };
