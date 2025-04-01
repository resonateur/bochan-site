import React, { useEffect, useState, useMemo } from "react";
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
  const { activeImageIndex } = useImageTransition({ images });
  const [loaded, setLoaded] = useState<boolean[]>([]);

  // Function to render the name with alternating styles and custom kerning
  const renderedName = useMemo(() => {
    const styledChars = photographerName.split("").map((char, index) => {
      const lowerChar = char.toLowerCase();
      const className = index % 2 === 0 ? styles.normalChar : styles.italicChar;

      // Add class names for kerning specific pairs
      let kernClass = "";
      if (
        lowerChar === "u" &&
        index > 0 &&
        photographerName[index - 1].toLowerCase() === "y"
      ) {
        kernClass = "u";
      } else if (
        lowerChar === "c" &&
        index > 0 &&
        photographerName[index - 1].toLowerCase() === "o"
      ) {
        kernClass = "c";
      } else if (
        lowerChar === "y" &&
        index < photographerName.length - 1 &&
        photographerName[index + 1].toLowerCase() === "u"
      ) {
        kernClass = "y";
      } else if (
        lowerChar === "o" &&
        index < photographerName.length - 1 &&
        photographerName[index + 1].toLowerCase() === "c"
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
  }, [photographerName]);

  // Efficient image preloading
  useEffect(() => {
    setLoaded(Array(images.length).fill(false));

    // Preload only the first few images initially, then the rest
    const preloadImage = (index: number) => {
      if (index >= images.length) return;

      const img = new Image();
      img.onload = () => {
        setLoaded((prev) => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });

        // Load next image after this one loads
        if (index < images.length - 1) {
          setTimeout(() => preloadImage(index + 1), 100);
        }
      };
      img.onerror = () => {
        setLoaded((prev) => {
          const newLoaded = [...prev];
          newLoaded[index] = true; // Consider errors as loaded
          return newLoaded;
        });
      };
      img.src = images[index];
    };

    // Start with the first image
    if (images.length > 0) {
      preloadImage(0);
    }
  }, [images]);

  useEffect(() => {
    document.body.classList.add("hide-cursor");
    document.documentElement.classList.add("hide-cursor");

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
      {/* Only render image elements for images that are loaded */}
      {images.map(
        (image, index) =>
          (loaded[index] || index === 0) && (
            <div
              key={`bg-image-${index}`}
              className={styles.bgImage}
              style={{
                backgroundImage: loaded[index] ? `url(${image})` : "none",
                opacity: index === activeImageIndex ? 1 : 0,
                transform: "translate3d(0,0,0)", // Force GPU acceleration
              }}
            />
          )
      )}

      <div className={styles.content}>
        <h1 className={styles.photographerName}>{renderedName}</h1>
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
