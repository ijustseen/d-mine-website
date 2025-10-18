"use client";

import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { WikiPage } from "@/lib/wiki";
import styles from "./WikiMobileMenu.module.scss";

interface WikiMobileMenuProps {
  pages: WikiPage[];
  currentSlug: string;
  headings: Array<{ id: string; title: string; level: number }>;
}

export default function WikiMobileMenu({
  pages,
  currentSlug,
  headings,
}: WikiMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  };

  // Предотвращаем всплытие события скролла
  const handleMenuScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.mobileMenuButton} ${isOpen ? styles.expanded : ""}`}
    >
      <div className={styles.mobileMenuHeader} onClick={toggleMenu}>
        {isOpen ? <IoClose /> : <IoMenu />}
        <span>Навигация по Wiki</span>
      </div>

      {isOpen && (
        <div className={styles.mobileMenuContent} onWheel={handleMenuScroll}>
          {/* Содержание текущей страницы */}
          {headings.length > 0 && (
            <>
              <h3 className={styles.mobileMenuSubtitle}>На этой странице</h3>
              <ul className={styles.mobileNavList}>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      <span className={styles.headingText}>
                        {heading.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Другие страницы wiki */}
          <h3 className={styles.mobileMenuSubtitle}>Другие страницы</h3>
          <ul className={styles.mobileNavList}>
            {pages.map((page) => (
              <li key={page.slug}>
                <a
                  href={page.slug === "index" ? "/wiki" : `/wiki/${page.slug}`}
                  className={`${styles.mobileNavLink} ${
                    currentSlug === page.slug ? styles.active : ""
                  }`}
                  onClick={closeMenu}
                >
                  <span className={styles.pageTitle}>{page.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
