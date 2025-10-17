import fs from "fs";
import path from "path";

export interface WikiPage {
  slug: string;
  title: string;
  content: string;
}

export function getWikiPages(): WikiPage[] {
  const wikiDir = path.join(process.cwd(), "public/wiki");

  try {
    const files = fs.readdirSync(wikiDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    return mdFiles.map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(wikiDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      // Извлекаем заголовок из первой строки с #
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : slug;

      return {
        slug,
        title,
        content,
      };
    });
  } catch (error) {
    console.error("Error reading wiki files:", error);
    return [];
  }
}

export function getWikiPage(slug: string): WikiPage | null {
  const wikiDir = path.join(process.cwd(), "public/wiki");
  const filePath = path.join(wikiDir, `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    return {
      slug,
      title,
      content,
    };
  } catch (error) {
    return null;
  }
}
