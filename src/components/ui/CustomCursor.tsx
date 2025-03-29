// src/components/ui/CustomCursor.tsx
import React, { useState, useEffect } from "react";
import styles from "@/styles/CustomCursor.module.css";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      // Get element directly under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);

      // Check if the element or any of its parents is interactive
      const isInteractive = checkIfInteractive(element);
      setIsHovering(isInteractive);
    };

    // Recursively check if an element or its parents are interactive
    const checkIfInteractive = (element: Element | null): boolean => {
      if (!element) return false;

      // Check for interactive class or tag names
      if (
        element.classList.contains("interactive") ||
        element.tagName === "A" ||
        element.tagName === "BUTTON" ||
        element.getAttribute("role") === "button" ||
        element.classList.contains("leftNav") ||
        element.classList.contains("rightNav") ||
        element.classList.contains("worksButton") ||
        element.classList.contains("menuItem") ||
        element.classList.contains("navLink") ||
        element.classList.contains("contactItem") ||
        element.classList.contains("infoLink")
      ) {
        return true;
      }

      // Check parent element recursively
      return checkIfInteractive(element.parentElement);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateHoverState);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${isHovering ? styles.hover : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

export default CustomCursor;
