import { useState, useEffect, useRef } from "react";

interface UseImageTransitionProps {
  images: string[];
}

const useImageTransition = ({ images }: UseImageTransitionProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number>(0);
  const lastAreaRef = useRef<number>(-1);

  // Use requestAnimationFrame for smoother rendering
  const animate = (time: number) => {
    // Only update at most every 150ms (very aggressive throttling)
    if (time - previousTimeRef.current >= 150) {
      previousTimeRef.current = time;

      // Get cursor position
      const mouseX = window.mouseX || 0;
      const mouseY = window.mouseY || 0;

      // Calculate the area (0-5)
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isRightHalf = mouseX > width / 2;
      const verticalSection = Math.floor(mouseY / (height / 3));
      const currentArea = Math.min(
        (isRightHalf ? 3 : 0) + verticalSection,
        images.length - 1
      );

      // Only update if the area has changed
      if (currentArea !== lastAreaRef.current) {
        lastAreaRef.current = currentArea;
        setActiveImageIndex(currentArea);
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  // Track mouse position globally to avoid excessive event handlers
  useEffect(() => {
    // Store mouse position globally to reduce event handler overhead
    window.mouseX = 0;
    window.mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };

    // Use passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Start the animation frame loop
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [images.length]);

  return { activeImageIndex };
};

// Add window properties for TypeScript
declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
  }
}

export default useImageTransition;
