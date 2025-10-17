import { getWikiPages, getWikiPage } from "@/lib/wiki";
import { extractHeadings, parseMarkdownWithHeadings } from "@/lib/markdown";
import WikiNavigation from "@/components/WikiNavigation/WikiNavigation";
import styles from "./page.module.scss";

export default function Wiki() {
  const pages = getWikiPages();
  const currentPage = getWikiPage("index");

  if (!currentPage) {
    return <div>Страница не найдена</div>;
  }

  // Извлекаем заголовки из контента для правой панели
  const headings = extractHeadings(currentPage.content);

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <WikiNavigation pages={pages} currentSlug="index" />
        </aside>

        <section className={styles.content}>
          <div
            dangerouslySetInnerHTML={{
              __html: parseMarkdownWithHeadings(currentPage.content),
            }}
          />
        </section>

        <aside className={styles.rightSidebar}>
          <h3>На этой странице</h3>
          <div className={styles.sidebarContent}>
            <ul className={styles.tocList}>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
