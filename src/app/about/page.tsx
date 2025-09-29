"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";

export default function About() {
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

  const teamMembers = [
    {
      name: "AdminName",
      role: "Главный администратор",
      description: "Основатель сервера",
    },
    {
      name: "ModerName1",
      role: "Модератор",
      description: "Следит за порядком",
    },
    { name: "ModerName2", role: "Модератор", description: "Помощь игрокам" },
    { name: "BuilderName", role: "Строитель", description: "Создание локаций" },
  ];

  // Пример изображений - замените на реальные пути к вашим скриншотам
  const serverImages = [
    {
      src: "/about-images/about.png",
      title: "Спавн сервера",
      description: "Место появления новых игроков",
    },
    {
      src: "/about-images/about.png",
      title: "Вид на остров",
      description: "Панорама главного острова",
    },
    {
      src: "/about-images/about.png",
      title: "База игрока",
      description: "Пример постройки игрока",
    },
    {
      src: "/about-images/about.png",
      title: "Зона ивентов",
      description: "Место проведения мероприятий",
    },
    {
      src: "/about-images/about.png",
      title: "Торговая площадь",
      description: "Центр экономики сервера",
    },
    {
      src: "/about-images/about.png",
      title: "PvP арена",
      description: "Место для сражений",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % serverImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + serverImages.length) % serverImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

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

          <div className={styles.carousel}>
            <div className={styles.carouselContainer}>
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
                onClick={prevImage}
                aria-label="Предыдущий скриншот"
              >
                ‹
              </button>

              <div className={styles.carouselSlide}>
                <Image
                  src={serverImages[currentImageIndex].src}
                  alt={serverImages[currentImageIndex].title}
                  className={styles.carouselImage}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='24'%3EЗагрузка...%3C/text%3E%3C/svg%3E"
                  onError={() => {
                    console.log(
                      `Не удалось загрузить изображение: ${serverImages[currentImageIndex].src}`
                    );
                  }}
                />
                <div className={styles.carouselCaption}>
                  <h3>{serverImages[currentImageIndex].title}</h3>
                  <p>{serverImages[currentImageIndex].description}</p>
                </div>
              </div>

              <button
                className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                onClick={nextImage}
                aria-label="Следующий скриншот"
              >
                ›
              </button>
            </div>

            {/* Индикаторы */}
            <div className={styles.carouselIndicators}>
              {serverImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselIndicator} ${
                    index === currentImageIndex
                      ? styles.carouselIndicatorActive
                      : ""
                  }`}
                  onClick={() => goToImage(index)}
                  aria-label={`Перейти к скриншоту ${index + 1}`}
                />
              ))}
            </div>

            {/* Счетчик */}
            <div className={styles.carouselCounter}>
              {currentImageIndex + 1} / {serverImages.length}
            </div>
          </div>
        </section>

        {/* Команда сервера */}
        <section className={styles.team}>
          <h2 className={styles.sectionTitle}>Команда сервера</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <div className={styles.memberAvatar}>
                  <Image
                    src={`https://mc-heads.net/avatar/${member.name}/64`}
                    alt={`Аватар ${member.name}`}
                    width={64}
                    height={64}
                    className={styles.memberAvatarImage}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%234a90e2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24'%3E?%3C/text%3E%3C/svg%3E"
                    onError={() => {
                      console.log(
                        `Не удалось загрузить аватар: ${member.name}`
                      );
                    }}
                  />
                </div>
                <h3>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberDescription}>{member.description}</p>
              </div>
            ))}
          </div>
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
