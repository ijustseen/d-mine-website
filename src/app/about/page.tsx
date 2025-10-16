import Image from "next/image";
import styles from "./page.module.scss";
import AboutCarousel, { type CarouselImage } from "./AboutCarousel";
import { getAboutImages } from "./getAboutImages";

export default async function About() {
  const serverFeatures = [
    "Уникальная система выживания на острове",
    "Кастомные рецепты крафта",
    "Система экономики и торговли",
    "Приватные территории игроков",
    "Еженедельные ивенты и конкурсы",
    "Дружелюбное сообщество",
    "Активная администрация 24/7",
    "Защита от гриферов",
  ];

  const serverImages: CarouselImage[] = await getAboutImages();

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        {/* Заголовок */}
        <section className={styles.hero}>
          <h1 className={styles.title}>О сервере D.Mine</h1>
          <p className={styles.subtitle}>
            Приватный сервер выживания на острове с уникальными механиками
          </p>
        </section>

        {/* Описание сервера */}
        <section className={styles.description}>
          <h2 className={styles.sectionTitle}>
            Добро пожаловать на остров выживания!
          </h2>
          <p>
            D.Mine — это уникальный приватный сервер Minecraft, где вас ждет
            незабываемое приключение на таинственном острове. Здесь каждый игрок
            начинает свой путь с нуля, исследуя неизведанные территории, добывая
            ресурсы и строя свой дом в суровых условиях островной жизни.
          </p>
          <p>
            Наш сервер предлагает сбалансированный геймплей с элементами
            выживания, где важны как индивидуальные навыки, так и командная
            работа. Присоединяйтесь к нашему дружному сообществу и создавайте
            свою историю на острове!
          </p>
        </section>

        {/* Особенности сервера */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Особенности сервера</h2>
          <div className={styles.featureGrid}>
            {serverFeatures.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Карусель скриншотов */}
        <section className={styles.gallery}>
          <h2 className={styles.sectionTitle}>Скриншоты сервера</h2>
          <AboutCarousel images={serverImages} />
        </section>

        {/* Информация о сервере */}
        <section className={styles.serverInfo}>
          <h2 className={styles.sectionTitle}>Техническая информация</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Версия Minecraft:</strong>
              <span>1.21.9</span>
            </div>
            <div className={styles.infoItem}>
              <strong>IP адрес:</strong>
              <code>play.d-mine.ru</code>
            </div>
            <div className={styles.infoItem}>
              <strong>Режим игры:</strong>
              <span>Выживание (Survival)</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Максимум игроков:</strong>
              <span>50 человек</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Время работы:</strong>
              <span>24/7</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Регион:</strong>
              <span>Россия</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
