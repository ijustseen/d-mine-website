import { getWikiPages, getWikiPage } from "@/lib/wiki";
import WikiNavigation from "@/components/WikiNavigation/WikiNavigation";
import styles from "./page.module.scss";

export default function Wiki() {
  const pages = getWikiPages();
  const currentPage = getWikiPage("index");

  if (!currentPage) {
    return <div>Страница не найдена</div>;
  }

  // Извлекаем заголовки из контента для правой панели
  const headings = currentPage.content
    .split("\n")
    .filter((line) => line.match(/^##\s+/))
    .map((line, index) => {
      const title = line.replace(/^##\s+/, "");
      let id = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-а-яё]/gi, "");

      // Если ID пустой или содержит только дефисы, используем индекс
      if (!id || id.replace(/-/g, "") === "") {
        id = `heading-${index}`;
      }

      return { title, id };
    });

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <WikiNavigation pages={pages} currentSlug="index" />
        </aside>

        <section className={styles.content}>
          <div
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(currentPage.content),
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

// Простой парсер markdown для базовых элементов
function parseMarkdown(content: string): string {
  return (
    content
      // Изображения с подписями
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)\s*\n\s*\*([^*]+)\*/g,
        '<div style="width: 100%; text-align: center; margin: 2rem 0; padding: 1.5rem; background: var(--gray-alpha-50); border-radius: 12px; border: 1px solid var(--gray-alpha-100);"><img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 0.75rem;" /><div style="color: var(--foreground); opacity: 0.7; font-size: 0.9rem; font-style: italic;">$3</div></div>'
      )
      // Изображения без подписей
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<div style="width: 100%; text-align: center; margin: 2rem 0; padding: 1.5rem; background: var(--gray-alpha-50); border-radius: 12px; border: 1px solid var(--gray-alpha-100);"><img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" /></div>'
      )
      // Ссылки
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color: var(--link-color); text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">$1</a>'
      )
      // Заголовки
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, (_, title) => {
        let id = title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-а-яё]/gi, "");

        // Если ID пустой или содержит только дефисы, используем случайный ID
        if (!id || id.replace(/-/g, "") === "") {
          id = `heading-${Math.random().toString(36).substr(2, 9)}`;
        }

        return `<h2 id="${id}">${title}</h2>`;
      })
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      // Жирный текст
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      // Курсив
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      // Код
      .replace(
        /`([^`]+)`/g,
        '<code style="background: var(--gray-alpha-100); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace;">$1</code>'
      )
      // Блоки кода
      .replace(
        /```([^`]+)```/g,
        '<pre style="background: var(--gray-alpha-100); padding: 1rem; border-radius: 8px; overflow-x: auto;"><code>$1</code></pre>'
      )
      // Списки
      .replace(/^\* (.+)$/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
      .replace(/(<li>.*<\/li>)/gs, (match) => {
        // Проверяем, есть ли цифры в начале элементов списка в исходном тексте
        const hasNumbers =
          content.includes("1. ") ||
          content.includes("2. ") ||
          content.includes("3. ");
        return hasNumbers ? `<ol>${match}</ol>` : `<ul>${match}</ul>`;
      })
      // Параграфы
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[h|u|o|l|i|p])/gm, "<p>")
      .replace(/(?<!>)$/gm, "</p>")
      .replace(/<p><\/p>/g, "")
      .replace(/<p>(<[h|u|o|i])/g, "$1")
      .replace(/(<\/[h|u|o|l].*>)<\/p>/g, "$1")
  );
}
