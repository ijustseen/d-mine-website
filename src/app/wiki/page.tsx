import styles from "./page.module.scss";

export default function Wiki() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <h3>Навигация по вики</h3>
          <div className={styles.sidebarContent}>
            <ul className={styles.navList}>
              <li>
                <a href="#" className={styles.active}>
                  Введение
                </a>
              </li>
              <li>
                <a href="#">Часто задаваемые вопросы</a>
              </li>
              <li>
                <a href="#">Словарь терминов</a>
              </li>
              <li>
                <a href="#">Команды</a>
              </li>
              <li>
                <a href="#">Игровой контент</a>
              </li>
              <li>
                <a href="#">Кастомизация стендов</a>
              </li>
              <li>
                <a href="#">Внешний вид</a>
              </li>
              <li>
                <a href="#">Новые крафты</a>
              </li>
              <li>
                <a href="#">Краткий гайд по моду Litematica</a>
              </li>
              <li>
                <a href="#">Текстовые дисплеи</a>
              </li>
              <li>
                <a href="#">Оформление домов в Мире построек</a>
              </li>
              <li>
                <a href="#">Голосы</a>
              </li>
              <li>
                <a href="#">Невидимая рамка</a>
              </li>
              <li>
                <a href="#">Социальный рейтинг</a>
              </li>
              <li>
                <a href="#">Ресурспак и смайлы</a>
              </li>
            </ul>
          </div>
        </aside>

        <section className={styles.content}>
          <h1>Введение</h1>
          <p>
            Это вики сервера PepeLand. В вики вы найдёте гайды и ответы на ваши
            вопросы, связанные с сервером.
          </p>

          <h2 id="payment">Есть вопросы об оплате?</h2>
          <ul>
            <li>
              <a href="#">Часто задаваемые вопросы об оплате</a>
            </li>
          </ul>

          <h2 id="first-time">Впервые на сервере?</h2>
          <ul>
            <li>
              <a href="#">Правила сервера</a>
            </li>
            <li>
              <a href="#">Команды сервера</a>
            </li>
            <li>
              <a href="#">Разрешенные и запрещённые модификации</a>
            </li>
            <li>
              <a href="#">Ресурспак смайлов и предметов</a>
            </li>
            <li>
              <a href="#">Система социального рейтинга</a>
            </li>
            <li>
              <a href="#">Интеграция с Discord, Twitch и Google</a>
            </li>
            <li>
              <a href="#">Словарь терминов, используемые на сервере</a>
            </li>
          </ul>

          <h2 id="guides">Ищете гайды?</h2>
          <p>
            <a href="#">Гайд по моду Litematica</a>
          </p>
        </section>

        <aside className={styles.rightSidebar}>
          <h3>На этой странице</h3>
          <div className={styles.sidebarContent}>
            <ul className={styles.tocList}>
              <li>
                <a href="#payment">Есть вопросы об оплате?</a>
              </li>
              <li>
                <a href="#first-time">Впервые на сервере?</a>
              </li>
              <li>
                <a href="#guides">Ищете гайды?</a>
              </li>
              <li>
                <a href="#additional">Ищете дополнительные крафты?</a>
              </li>
              <li>
                <a href="#questions">Остались вопросы?</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
