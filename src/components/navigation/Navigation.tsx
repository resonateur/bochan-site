import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/Navigation.module.css";

interface NavigationProps {
  photographerName: string;
}

const Navigation: React.FC<NavigationProps> = ({ photographerName }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navigation}>
      <Link href="/feed" className={styles.navLink}>
        COLLECTIONS
      </Link>

      <h1 className={styles.photographerName}>{photographerName}</h1>

      <div className={styles.themeToggle} onClick={toggleTheme}>
        WORKS <span className={`${styles.square} ${styles[theme]}`}>□</span>
      </div>
    </nav>
  );
};

export default Navigation;
