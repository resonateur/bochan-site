import React from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";
import { useRouter } from "next/router";

interface FooterProps {
  showInfoLink?: boolean;
  designCredit?: string;
  showYear?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  showInfoLink = true,
  designCredit,
  showYear = true,
}) => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      {showYear && <div className={`${styles.year} yearIndicator`}>2025°</div>}

      <div className={styles.rightContent}>
        {designCredit && (
          <div className={styles.designCredit}>{designCredit}</div>
        )}
        {showInfoLink && (
          <Link href="/info" className={`${styles.infoLink} interactive`}>
            INFO
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
