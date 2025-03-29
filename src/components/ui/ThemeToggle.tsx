import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateTo = (route: string) => {
    router.push(route);
    setMenuOpen(false);
  };

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.themeToggle} onClick={toggleMenu}>
        WORKS <span className={styles.square}>□</span>
      </div>

      {menuOpen && (
        <div className={styles.worksMenu}>
          <div className={styles.closeButton} onClick={toggleMenu}>
            ✕
          </div>
          <h1 className={styles.menuTitle}>PHOTOGRAPHER NAME</h1>
          <div className={styles.menuItems}>
            <div
              className={styles.menuItem}
              onClick={() => navigateTo("/projects")}
            >
              <span className={styles.itemName}>PROJECTS</span>
              <span className={styles.itemNumber}>1</span>
            </div>
            <div
              className={styles.menuItem}
              onClick={() => navigateTo("/portraits")}
            >
              <span className={styles.itemName}>PORTRAITS</span>
              <span className={styles.itemNumber}>2</span>
            </div>
            <div
              className={styles.menuItem}
              onClick={() => navigateTo("/info")}
            >
              <span className={styles.itemName}>INFO</span>
              <span className={styles.itemNumber}>3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
