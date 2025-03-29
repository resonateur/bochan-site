// Update LandingBackground.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useImageTransition from "@/hooks/useImageTransition";
import styles from "@/styles/LandingBackground.module.css";

interface LandingBackgroundProps {
  images: string[];
  photographerName: string;
}

const LandingBackground: React.FC<LandingBackgroundProps> = ({
  images,
  photographerName,
}) => {
  const router = useRouter();
  const { activeImageIndex } = useImageTransition({ images, gridSize: 3 });

  // Add useEffect to ensure cursor is hidden
  useEffect(() => {
    // Add custom class to body when component mounts
    document.body.classList.add("hide-cursor");
    document.documentElement.classList.add("hide-cursor");

    // Clean up when component unmounts
    return () => {
      document.body.classList.remove("hide-cursor");
      document.documentElement.classList.remove("hide-cursor");
    };
  }, []);

  const navigateToFeed = () => {
    router.push("/feed");
  };

  const navigateToInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/info");
  };

  return (
    <div
      className={`${styles.landingContainer} hide-cursor`}
      onClick={navigateToFeed}
      data-testid="landing-container"
      style={{ cursor: "none !important" }}
    >
      {images.map((image, index) => (
        <div
          key={`bg-image-${index}`}
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeImageIndex ? 1 : 0,
            cursor: "none",
          }}
        />
      ))}

      <div className={styles.content}>
        <h1 className={styles.photographerName}>{photographerName}</h1>
        <div className={styles.footer}>
          <div className={styles.year}>2025°</div>
          <div
            className={`${styles.navLink} interactive`}
            onClick={navigateToInfo}
            style={{ cursor: "none" }}
          >
            INFO
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBackground;
