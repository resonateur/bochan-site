import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/CollectionsMenu.module.css";

interface MenuItem {
  label: string;
  route: string;
  number: number;
}

interface CollectionsMenuProps {
  photographerName: string;
  activeItem?: number;
}

const CollectionsMenu: React.FC<CollectionsMenuProps> = ({
  photographerName,
  activeItem = 0,
}) => {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { label: "PROJECTS", route: "/projects", number: 1 },
    { label: "PORTRAITS", route: "/portraits", number: 2 },
    { label: "COVER ART", route: "/cover-art", number: 3 },
    { label: "VIDEOS", route: "/videos", number: 4 },
    { label: "INFO", route: "/info", number: 5 },
  ];

  const handleClose = () => {
    router.back();
  };

  const navigateToItem = (route: string) => {
    router.push(route);
  };

  return (
    <div className={styles.collectionsMenu}>
      <header className={styles.menuHeader}>
        <div className={styles.leftNav}>COLLECTIONS</div>
        <h1 className={styles.photographerName}>{photographerName}</h1>
        <div className={styles.closeButton} onClick={handleClose}>
          ✕
        </div>
      </header>

      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          <div
            key={`menu-item-${index}`}
            className={styles.menuItem}
            onClick={() => navigateToItem(item.route)}
          >
            <div className={styles.itemLabel}>
              <span
                className={`${styles.activeIndicator} ${index === activeItem ? styles.active : ""}`}
              >
                {index === activeItem ? "●" : ""}
              </span>
              <span className={styles.itemName}>{item.label}</span>
            </div>
            <div className={styles.itemNumber}>{item.number}</div>
          </div>
        ))}
      </div>

      <div className={styles.menuFooter}>
        <div className={styles.year}>2025°</div>
      </div>
    </div>
  );
};

export default CollectionsMenu;
