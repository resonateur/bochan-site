import React, { useEffect } from "react";
import Head from "next/head";
import LandingBackground from "@/components/landing/LandingBackground";

// Sample data for initial development
const sampleImages = [
  "/images/landing/image1.jpg",
  "/images/landing/image2.jpg",
  "/images/landing/image3.jpg",
  "/images/landing/image4.jpg",
  "/images/landing/image5.jpg",
  "/images/landing/image6.jpg",
];

const photographerName = "YURI BOCHAN";

export default function Home() {
  // Use useEffect to ensure client-side execution
  useEffect(() => {
    // Make sure veil animation runs only once
    const hasAnimated = sessionStorage.getItem("veilAnimated");

    if (!hasAnimated) {
      const veil = document.createElement("div");
      veil.className = "veil-animation";
      document.body.appendChild(veil);

      // Mark as animated in session storage
      sessionStorage.setItem("veilAnimated", "true");

      // Remove veil after animation completes
      setTimeout(() => {
        document.body.removeChild(veil);
      }, 1500);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{photographerName} | Photography</title>
        <meta
          name="description"
          content={`Portfolio of photographer ${photographerName}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          .veil-animation {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: #000000;
            z-index: 9999;
            animation: slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
  
          @keyframes slideUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }
        `}</style>
      </Head>

      <main>
        <LandingBackground
          images={sampleImages}
          photographerName={photographerName}
        />
      </main>
    </>
  );
}
