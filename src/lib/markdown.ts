// Утилиты для обработки markdown контента

export interface Heading {
  title: string;
  id: string;
  level: number;
}

// Функция для генерации уникального ID из заголовка
function generateHeadingId(title: string, counter: number): string {
  const id = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-а-яё]/gi, "");

  return id ? `${id}-${counter}` : `heading-${counter}`;
}

// Функция для извлечения заголовков из markdown контента
export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  let counter = 0;

  lines.forEach((line) => {
    // Только заголовки h2 (##), исключаем h3 (###)
    if (line.match(/^##\s+/) && !line.match(/^###\s+/)) {
      const title = line.replace(/^##\s+/, "");
      const id = generateHeadingId(title, counter);

      headings.push({
        title,
        id,
        level: 2,
      });

      counter++;
    }
  });

  return headings;
}

// Функция для парсинга markdown в HTML с правильными ID
export function parseMarkdownWithHeadings(content: string): string {
  const headings = extractHeadings(content);

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
      .replace(/^## (.+)$/gm, (_: string, title: string) => {
        const heading = headings.find(
          (h) => h.title === title && h.level === 2
        );
        if (heading) {
          return `<h2 id="${heading.id}">${title}</h2>`;
        }
        return `<h2>${title}</h2>`;
      })
      .replace(/^### (.+)$/gm, (_: string, title: string) => {
        // h3 заголовки не включаются в навигацию, поэтому без ID
        return `<h3>${title}</h3>`;
      })
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
      .replace(/(<li>[\s\S]*?<\/li>)/g, (match) => {
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
