// src/components/navigation/NavigationMenuOverlay.tsx (full file)
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import styles from "@/styles/NavigationMenuOverlay.module.css";

interface NavigationMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  photographerName: string;
}

const NavigationMenuOverlay: React.FC<NavigationMenuOverlayProps> = ({
  isOpen,
  onClose,
  photographerName,
}) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Background images for each section
  const backgroundImages = {
    projects: "/images/menu/projects-bg.jpg",
    portraits: "/images/menu/portraits-bg.jpg",
    info: "/images/menu/info-bg.jpg",
    default: "",
  };

  useEffect(() => {
    // Lock scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navigateTo = (route: string) => {
    router.push(route);
    onClose();
  };

  const handleMouseEnter = (section: string) => {
    setActiveSection(section);
  };

  const handleMouseLeave = () => {
    setActiveSection(null);
  };

  // If menu is not open, don't render anything
  if (!isOpen || typeof window === "undefined") return null;

  // Get current background image based on active section
  const currentBgImage = activeSection
    ? backgroundImages[activeSection as keyof typeof backgroundImages]
    : backgroundImages.default;

  // Use portal to render at document body level
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      {/* Background image */}
      {currentBgImage && (
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url(${currentBgImage})`,
            opacity: activeSection ? 0.2 : 0, // Subtle opacity
          }}
        />
      )}

      <div className={styles.menuHeader}>
        <div
          className={`${styles.leftNav} interactive`}
          onClick={() => navigateTo("/feed")}
        >
          COLLECTIONS
        </div>
        <h1 className={styles.photographerName} onClick={() => navigateTo("/")}>
          {photographerName}
        </h1>
        <div className={`${styles.closeButton} interactive`} onClick={onClose}>
          ✕
        </div>
      </div>

      <div className={styles.menuContent}>
        <div className={styles.menuItems}>
          <div
            className={`${styles.menuItem} interactive`}
            onClick={() => navigateTo("/projects")}
            onMouseEnter={() => handleMouseEnter("projects")}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.itemName}>PROJECTS</div>
            <div className={styles.itemNumber}>1</div>
          </div>
          <div
            className={`${styles.menuItem} interactive`}
            onClick={() => navigateTo("/portraits")}
            onMouseEnter={() => handleMouseEnter("portraits")}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.itemName}>PORTRAITS</div>
            <div className={styles.itemNumber}>2</div>
          </div>
          <div
            className={`${styles.menuItem} interactive`}
            onClick={() => navigateTo("/info")}
            onMouseEnter={() => handleMouseEnter("info")}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.itemName}>INFO</div>
            <div className={styles.itemNumber}>3</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NavigationMenuOverlay;
