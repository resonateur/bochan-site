// src/components/navigation/NavigationMenu.tsx
import React, { useState } from "react";
import NavigationMenuOverlay from "./NavigationMenuOverlay";
import styles from "@/styles/NavigationMenu.module.css";

interface NavigationMenuProps {
  photographerName: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  photographerName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={`${styles.worksButton} interactive`} onClick={toggleMenu}>
        WORKS <span className={styles.square}>□</span>
      </div>

      <NavigationMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        photographerName={photographerName}
      />
    </>
  );
};

export default NavigationMenu;
