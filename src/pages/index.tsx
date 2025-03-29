import React from "react";
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
  "/images/landing/image7.jpg",
  "/images/landing/image8.jpg",
  "/images/landing/image9.jpg",
];

const photographerName = "PHOTOGRAPHER NAME";

export default function Home() {
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
