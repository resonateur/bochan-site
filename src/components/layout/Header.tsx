// src/components/layout/Header.tsx - using CustomLink
import React from "react";
import CustomLink from "@/components/ui/CustomLink";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import styles from "@/styles/Header.module.css";

interface HeaderProps {
  photographerName: string;
}

const Header: React.FC<HeaderProps> = ({ photographerName }) => {
  // Function to render the name with alternating styles and custom kerning
  const renderStyledName = (name: string) => {
    // First, split the name into characters with their styles
    const styledChars = name.split("").map((char, index) => {
      const lowerChar = char.toLowerCase();
      const className = index % 2 === 0 ? styles.normalChar : styles.italicChar;

      // Add class names for kerning specific pairs
      let kernClass = "";
      if (
        lowerChar === "u" &&
        index > 0 &&
        name[index - 1].toLowerCase() === "y"
      ) {
        kernClass = "u";
      } else if (
        lowerChar === "c" &&
        index > 0 &&
        name[index - 1].toLowerCase() === "o"
      ) {
        kernClass = "c";
      } else if (
        lowerChar === "y" &&
        index < name.length - 1 &&
        name[index + 1].toLowerCase() === "u"
      ) {
        kernClass = "y";
      } else if (
        lowerChar === "o" &&
        index < name.length - 1 &&
        name[index + 1].toLowerCase() === "c"
      ) {
        kernClass = "o";
      }

      return (
        <span key={index} className={`${className} ${kernClass}`}>
          {char}
        </span>
      );
    });

    // Wrap the entire name with the kern classes
    return <span className="kern-yu kern-oc">{styledChars}</span>;
  };

  return (
    <header className={styles.header}>
      <CustomLink
        href="/feed"
        className={styles.leftNav}
        forceNavigation={true}
      >
        COLLECTIONS
      </CustomLink>
      <CustomLink href="/" className={styles.nameLink} interactive={false}>
        <h1 className={styles.photographerName}>
          {renderStyledName(photographerName)}
        </h1>
      </CustomLink>
      <div className={styles.rightNav}>
        <NavigationMenu photographerName={photographerName} />
      </div>
    </header>
  );
};

export default Header;
