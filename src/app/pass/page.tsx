"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { SiBoosty, SiTwitch } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";

export default function Entrance() {
  const [isTwitch, setTwitch] = useState(false);

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Выбор способа оплаты"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isTwitch}
            className={`${styles.tab} ${styles.tabBoosty} ${
              !isTwitch ? styles.tabActive : ""
            }`}
            onClick={() => setTwitch(false)}
          >
            <SiBoosty aria-hidden size={18} />
            <span>Boosty</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isTwitch}
            className={`${styles.tab} ${styles.tabTwitch} ${
              isTwitch ? styles.tabActive : ""
            }`}
            onClick={() => setTwitch(true)}
          >
            <SiTwitch aria-hidden size={18} />
            <span>Twitch</span>
          </button>
        </div>

        {isTwitch ? (
          <section className={styles.card} aria-labelledby="twitch-title">
            <h1 id="twitch-title" className={styles.title}>
              Проходка через баллы канала Twitch
            </h1>
            <p className={styles.subtitle}>
              Обменяй баллы канала владельца сервера на проходку. Обычно
              проверка занимает 5–10 минут при онлайн‑стриме.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейди на канал владельца сервера и убедись, что идёт
                трансляция.
              </li>
              <li>
                Накопи нужное количество баллов канала и выкупи награду
                «Проходка на сервер».
              </li>
              <li>
                Не забудьте указать свой ник при приобретении проходки этим
                способом,а так же пришлите скрин с подтверждением приобретения в{" "}
                <a
                  className={styles.link}
                  href="https://t.me/pirozxhok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  поддержку
                </a>{" "}
                для добавления в вайт лист
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaTwitch}`}
                href="https://www.twitch.tv/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTwitch aria-hidden /> Перейти на Twitch
              </a>
              <a
                className={styles.cta}
                href="https://t.me/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdSupportAgent aria-hidden /> Перейти к поддержке
              </a>
            </div>
          </section>
        ) : (
          <section className={styles.card} aria-labelledby="boosty-title">
            <h1 id="boosty-title" className={styles.title}>
              Проходка через подписку Boosty
            </h1>
            <p className={styles.subtitle}>
              Оформи подписку на Boosty нашего сервера — после оплаты ты
              получишь доступ к форме для выдачи проходки.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейди на наш Boosty и выбери подходящий уровень подписки.
              </li>
              <li>Заверши оплату удобным способом.</li>
              <li>
                После оплаты пришлите скрин с подтверждением подписки и свой
                никнейм в{" "}
                <a
                  className={styles.link}
                  href="https://t.me/pirozxhok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  поддержку
                </a>{" "}
                для добавления в вайт лист
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaBoosty}`}
                href="https://boosty.to/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiBoosty aria-hidden /> Перейти на Boosty
              </a>
              <a
                className={styles.cta}
                href="https://t.me/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdSupportAgent aria-hidden /> Перейти к поддержке
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
