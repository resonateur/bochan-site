import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/CollectionGallery.module.css";

interface GalleryImage {
  src: string;
  alt: string;
}

interface CollectionGalleryProps {
  images: GalleryImage[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  images,
  title,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    },
    [onClose, images.length]
  );

  // Reset index when gallery opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      // Lock scroll
      document.body.style.overflow = "hidden";
      // Add keyboard event listeners
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Create click areas for navigation
  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // If clicked on the left third, go to previous image
    if (x < rect.width / 3) {
      handlePrev(e);
    }
    // If clicked on the right third, go to next image
    else if (x > (rect.width * 2) / 3) {
      handleNext(e);
    }
  };

  return (
    <div className={styles.galleryOverlay}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>{title}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={styles.galleryContent} onClick={handleImageClick}>
        <div className={styles.imageContainer}>
          <div
            className={styles.imagesTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={handlePrev}
          >
            &#10094;
          </button>
          <button
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={handleNext}
          >
            &#10095;
          </button>
        </div>

        <div className={styles.navigation}>
          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionGallery;
