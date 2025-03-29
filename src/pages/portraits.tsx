import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import styles from "@/styles/PortraitsPage.module.css";
import Footer from "@/components/layout/Footer";

// Sample data for initial development
const samplePortraits = [
  { id: "1", src: "/images/portraits/portrait1.jpg", alt: "Portrait 1" },
  { id: "2", src: "/images/portraits/portrait2.jpg", alt: "Portrait 2" },
  { id: "3", src: "/images/portraits/portrait3.jpg", alt: "Portrait 3" },
  { id: "4", src: "/images/portraits/portrait4.jpg", alt: "Portrait 4" },
  { id: "5", src: "/images/portraits/portrait5.jpg", alt: "Portrait 5" },
  { id: "6", src: "/images/portraits/portrait6.jpg", alt: "Portrait 6" },
  { id: "7", src: "/images/portraits/portrait7.jpg", alt: "Portrait 7" },
  { id: "8", src: "/images/portraits/portrait8.jpg", alt: "Portrait 8" },
];

const photographerName = "PHOTOGRAPHER NAME";

export default function Portraits() {
  return (
    <>
      <Head>
        <title>Portraits | {photographerName}</title>
        <meta
          name="description"
          content={`Portrait photography by ${photographerName}`}
        />
      </Head>

      <div className={styles.portraitsPage}>
        <Header photographerName={photographerName} />

        <main className={styles.main}>
          <GalleryGrid
            items={samplePortraits}
            showTitles={false}
            columns="portraits"
          />
        </main>

        <div className={styles.footer}>
          <div className={styles.year}>2025°</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
