import React from "react";
import Image from "next/image";
import styles from "@/styles/GalleryGrid.module.css";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  showTitles?: boolean;
  columns?: "projects" | "portraits" | "coverArt";
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showTitles = false,
  columns = "projects",
}) => {
  return (
    <div
      className={`${styles.galleryGrid} ${styles[columns]}`}
      role="region"
      aria-label="Photo gallery"
    >
      {items.map((item) => (
        <div key={item.id} className={styles.galleryItem} tabIndex={0}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
          {showTitles && item.title && (
            <div className={styles.itemTitle}>{item.title}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
