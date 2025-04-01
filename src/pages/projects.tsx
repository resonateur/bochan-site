import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CollectionGallery from "@/components/gallery/CollectionGallery";
import styles from "@/styles/ProjectsPage.module.css";
import Footer from "@/components/layout/Footer";

// Define the collection interface
interface Collection {
  id: string;
  title: string;
  thumbnail: string;
  alt: string;
  images: { src: string; alt: string }[];
}

// Sample collections data - should match your feed page collections
const collections: Collection[] = [
  {
    id: "1",
    title: "PROJECT ONE",
    thumbnail: "/images/projects/project1.jpg",
    alt: "Project 1",
    images: [
      { src: "/images/projects/project1.jpg", alt: "Project 1 - Image 1" },
      { src: "/images/projects/project2.jpg", alt: "Project 1 - Image 2" },
      { src: "/images/projects/project3.jpg", alt: "Project 1 - Image 3" },
    ],
  },
  {
    id: "2",
    title: "PROJECT TWO",
    thumbnail: "/images/projects/project4.jpg",
    alt: "Project 2",
    images: [
      { src: "/images/projects/project4.jpg", alt: "Project 2 - Image 1" },
      { src: "/images/projects/project5.jpg", alt: "Project 2 - Image 2" },
      { src: "/images/projects/project6.jpg", alt: "Project 2 - Image 3" },
    ],
  },
  {
    id: "3",
    title: "PROJECT THREE",
    thumbnail: "/images/projects/project6.jpg",
    alt: "Project 3",
    images: [
      { src: "/images/portraits/portrait1.jpg", alt: "Project 3 - Image 1" },
      { src: "/images/portraits/portrait2.jpg", alt: "Project 3 - Image 2" },
      { src: "/images/portraits/portrait3.jpg", alt: "Project 3 - Image 3" },
    ],
  },
  // Add more collections as needed
];

const photographerName = "YURI BOCHAN";

export default function Projects() {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null
  );
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Open gallery when clicking on a project
  const handleProjectClick = (id: string) => {
    const collection = collections.find((col) => col.id === id);
    if (collection) {
      setActiveCollection(collection);
      setGalleryOpen(true);
    }
  };

  // Close the gallery
  const closeGallery = () => {
    setGalleryOpen(false);
  };

  // Format collections for GalleryGrid
  const projectItems = collections.map((collection) => ({
    id: collection.id,
    src: collection.thumbnail,
    alt: collection.alt,
    title: collection.title,
  }));

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
            items={projectItems}
            showTitles={true}
            columns="projects"
            onItemClick={handleProjectClick}
          />
        </main>

        <div className={styles.footer}>
          <div className={styles.year}>2025°</div>
        </div>
        <Footer />
      </div>

      {/* Collection Gallery */}
      {activeCollection && (
        <CollectionGallery
          images={activeCollection.images}
          title={activeCollection.title}
          isOpen={galleryOpen}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
