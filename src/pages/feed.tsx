import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import CollectionGallery from "@/components/gallery/CollectionGallery";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/FeedPage.module.css";

// Define collection type
interface Collection {
  id: string;
  title: string;
  thumbnail: string;
  alt: string;
  images: { src: string; alt: string }[];
}

// Sample collections data
const collections: Collection[] = [
  {
    id: "1",
    title: "KIA RIO",
    thumbnail: "/images/projects/project1.jpg",
    alt: "Maslo Chernogo Tmina",
    images: [
      { src: "/images/projects/project1.jpg", alt: "Maslo Chernogo Tmina 1" },
      { src: "/images/projects/project2.jpg", alt: "Maslo Chernogo Tmina 2" },
      { src: "/images/projects/project3.jpg", alt: "Maslo Chernogo Tmina 3" },
    ],
  },
  {
    id: "2",
    title: "FYODOR THE GREATEST",
    thumbnail: "/images/projects/project4.jpg",
    alt: "Mgzavrebi – Kamara",
    images: [
      { src: "/images/projects/project4.jpg", alt: "Mgzavrebi 1" },
      { src: "/images/projects/project5.jpg", alt: "Mgzavrebi 2" },
      { src: "/images/projects/project6.jpg", alt: "Mgzavrebi 3" },
    ],
  },
  {
    id: "3",
    title: "DNIPRO RIVER",
    thumbnail: "/images/portraits/portrait1.jpg",
    alt: "Kash",
    images: [
      { src: "/images/portraits/portrait1.jpg", alt: "Kash 1" },
      { src: "/images/portraits/portrait2.jpg", alt: "Kash 2" },
      { src: "/images/portraits/portrait3.jpg", alt: "Kash 3" },
    ],
  },
  // Add more collections as needed
];

const photographerName = "YURI BOCHAN";

export default function Feed() {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null
  );
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Function to render the name with alternating styles and custom kerning
  const renderStyledName = (name: string) => {
    // First, split the name into characters with their styles
    const styledChars = name.split("").map((char, index) => {
      const lowerChar = char.toLowerCase();
      const className = index % 2 === 0 ? styles.normalChar : styles.italicChar;

      // Add class names for kerning specific pairs
      let kernClass = "";
      if (
        lowerChar === "u" &&
        index > 0 &&
        name[index - 1].toLowerCase() === "y"
      ) {
        kernClass = "u";
      } else if (
        lowerChar === "c" &&
        index > 0 &&
        name[index - 1].toLowerCase() === "o"
      ) {
        kernClass = "c";
      } else if (
        lowerChar === "y" &&
        index < name.length - 1 &&
        name[index + 1].toLowerCase() === "u"
      ) {
        kernClass = "y";
      } else if (
        lowerChar === "o" &&
        index < name.length - 1 &&
        name[index + 1].toLowerCase() === "c"
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
  };

  const openGallery = (collection: Collection) => {
    setActiveCollection(collection);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handleCollectionsClick = () => {
    // Force a hard refresh of the page
    window.location.href = "/feed";
  };

  return (
    <>
      <Head>
        <title>{photographerName}</title>
        <meta
          name="description"
          content={`Photography feed by ${photographerName}`}
        />
      </Head>

      <div className={styles.feedPage}>
        <header className={styles.header}>
          <div
            className={`${styles.leftNav} interactive`}
            onClick={handleCollectionsClick}
          >
            COLLECTIONS
          </div>
          <Link href="/" className={styles.nameLink}>
            <h1 className={styles.photographerName}>
              {renderStyledName(photographerName)}
            </h1>
          </Link>
          <div className={styles.rightNav}>
            <NavigationMenu photographerName={photographerName} />
          </div>
        </header>

        <main className={styles.feedContainer}>
          {collections.map((collection, index) => {
            // Determine position class based on index
            const positionClass =
              index % 3 === 0
                ? styles.centerFeed
                : index % 3 === 1
                  ? styles.rightFeed
                  : styles.leftFeed;

            return (
              <div
                key={collection.id}
                className={`${styles.feedItem} ${positionClass}`}
                onClick={() => openGallery(collection)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={collection.thumbnail}
                    alt={collection.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h2 className={styles.feedTitle}>{collection.title}</h2>
              </div>
            );
          })}
        </main>

        {/* Only one Footer component, no separate year indicator */}
        <Footer />
      </div>

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
