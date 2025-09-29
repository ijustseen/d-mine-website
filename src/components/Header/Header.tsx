"use client";

import { ThemeToggle } from "../../features/ThemeToggle/ThemeToggle";
import SocialLinks from "@/features/SocialLinks/SocialLinks";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "О сервере", path: "/about" },
    { label: "Проходка", path: "/entrance" },
    { label: "Правила", path: "/rules" },
    { label: "Вики", path: "/wiki" },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <div className={styles.burger}></div>
        <div className={styles.logo}>
          <span>D.Mine</span>
        </div>
        <div className={styles.navigation}>
          <ul className={styles.navBar}>
            {navItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <li
                  className={`${styles.navElement} ${
                    pathname === item.path ? styles.active : ""
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
          <SocialLinks />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
