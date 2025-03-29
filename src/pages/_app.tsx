import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    // Set its content to override all cursor styles
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      *:hover {
        cursor: none !important;
      }
      a, button, [role="button"], .interactive, .leftNav, .rightNav, a:hover, button:hover {
        cursor: none !important;
      }
    `;
    // Add it to the document head
    document.head.appendChild(style);

    return () => {
      // Clean up
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <CustomCursor />
    </ThemeProvider>
  );
}
