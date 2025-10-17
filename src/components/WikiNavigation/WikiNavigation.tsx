import Link from "next/link";
import { WikiPage } from "@/lib/wiki";
import styles from "./WikiNavigation.module.scss";

interface WikiNavigationProps {
  pages: WikiPage[];
  currentSlug?: string;
}

export default function WikiNavigation({
  pages,
  currentSlug,
}: WikiNavigationProps) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={page.slug === "index" ? "/wiki" : `/wiki/${page.slug}`}
              className={currentSlug === page.slug ? styles.active : ""}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
