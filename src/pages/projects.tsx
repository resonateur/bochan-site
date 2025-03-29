import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import styles from "@/styles/ProjectsPage.module.css";
import Footer from "@/components/layout/Footer";

// Sample data for initial development
const sampleProjects = [
  {
    id: "1",
    src: "/images/projects/project1.jpg",
    alt: "Project 1",
    title: "PROJECT ONE",
  },
  {
    id: "2",
    src: "/images/projects/project2.jpg",
    alt: "Project 2",
    title: "PROJECT TWO",
  },
  {
    id: "3",
    src: "/images/projects/project3.jpg",
    alt: "Project 3",
    title: "PROJECT THREE",
  },
  {
    id: "4",
    src: "/images/projects/project4.jpg",
    alt: "Project 4",
    title: "PROJECT FOUR",
  },
  {
    id: "5",
    src: "/images/projects/project5.jpg",
    alt: "Project 5",
    title: "PROJECT FIVE",
  },
  {
    id: "6",
    src: "/images/projects/project6.jpg",
    alt: "Project 6",
    title: "PROJECT SIX",
  },
];

const photographerName = "PHOTOGRAPHER NAME";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | {photographerName}</title>
        <meta
          name="description"
          content={`Photography projects by ${photographerName}`}
        />
      </Head>

      <div className={styles.projectsPage}>
        <Header photographerName={photographerName} />

        <main className={styles.main}>
          <GalleryGrid
            items={sampleProjects}
            showTitles={true}
            columns="projects"
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
