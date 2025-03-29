// src/components/layout/Header.tsx - using CustomLink
import React from "react";
import CustomLink from "@/components/ui/CustomLink";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import styles from "@/styles/Header.module.css";

interface HeaderProps {
  photographerName: string;
}

const Header: React.FC<HeaderProps> = ({ photographerName }) => {
  return (
    <header className={styles.header}>
      <CustomLink href="/feed" className={styles.leftNav}>
        COLLECTIONS
      </CustomLink>
      <CustomLink href="/" className={styles.nameLink} interactive={false}>
        <h1 className={styles.photographerName}>{photographerName}</h1>
      </CustomLink>
      <div className={styles.rightNav}>
        <NavigationMenu photographerName={photographerName} />
      </div>
    </header>
  );
};

export default Header;
