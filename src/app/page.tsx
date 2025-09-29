"use client";

import { Button } from "../components/Button";
import styles from "./page.module.scss";

export default function Home() {
  const serverIP = "play.d-mine.ru";

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);
      alert("IP адрес скопирован в буфер обмена!");
    } catch (err) {
      console.error("Не удалось скопировать IP:", err);
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea");
      textArea.value = serverIP;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("IP адрес скопирован в буфер обмена!");
    }
  };

  const handleBuyPass = () => {
    // Здесь будет логика перехода на страницу покупки
    window.open("https://your-shop-link.com", "_blank");
  };

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <h1 className={styles.title}>D.Mine</h1>
        <p className={styles.subtitle}>
          Приватный сервер с уникальными элементами выживания
        </p>
        <div className={styles.version}>Версия 1.21.9</div>

        <div className={styles.actions}>
          <Button onClick={handleBuyPass} size="large">
            Приобрести проходку
          </Button>
          <Button onClick={handleCopyIP} secondary size="large">
            Скопировать IP
          </Button>
        </div>

        <div className={styles.serverInfo}>
          <code className={styles.serverIP}>{serverIP}</code>
        </div>
      </main>
    </div>
  );
}
