import { useState, useEffect, useCallback } from "react";

interface UseImageTransitionProps {
  images: string[];
  gridSize?: number;
}

const useImageTransition = ({
  images,
  gridSize = 3,
}: UseImageTransitionProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (images.length === 0) return;

      const x = e.clientX;
      const y = e.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate which grid cell the cursor is in
      const gridX = Math.floor((x / width) * gridSize);
      const gridY = Math.floor((y / height) * gridSize);

      // Calculate the index based on grid position
      const index = gridY * gridSize + gridX;
      const normalizedIndex = Math.min(index, images.length - 1);

      setActiveImageIndex(normalizedIndex);
    },
    [images, gridSize]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { activeImageIndex };
};

export default useImageTransition;
