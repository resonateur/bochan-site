import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/InfoPage.module.css";

interface InfoPageProps {
  photographerName: string;
  email: string;
  instagram: string;
  agency: {
    name: string;
    email: string;
    phone: string;
  };
  designCredit?: string;
}

const InfoPage: React.FC<InfoPageProps> = ({
  photographerName = "PHOTOGRAPHER NAME",
  email = "IGORKLEPNEV@GMAIL.COM",
  instagram = "INSTAGRAM",
  agency = {
    name: "EIGHT AGENCY",
    email: "NS@EIGHT-AGENCY.COM",
    phone: "+7 910 404 1850",
  },
  designCredit = "Developed by resonateur",
}) => {
  return (
    <>
      <Head>
        <title>Info | {photographerName}</title>
        <meta
          name="description"
          content={`Contact information for photographer ${photographerName}`}
        />
      </Head>

      <div className={styles.infoContainer}>
        <Header photographerName={photographerName} />

        <div className={styles.infoContent}>
          <div className={styles.contactSection}>
            <a
              href={`mailto:${email}`}
              className={`${styles.contactItem} interactive`}
            >
              {email}
            </a>
            <a
              href={`https://instagram.com/`}
              className={`${styles.contactItem} interactive`}
            >
              {instagram}
            </a>
          </div>

          <div className={styles.agencySection}>
            <div className={styles.agencyItem}>
              REPRESENTED BY {agency.name}
            </div>
            <a
              href={`mailto:${agency.email}`}
              className={`${styles.contactItem} interactive`}
            >
              {agency.email}
            </a>
            <a
              href={`tel:${agency.phone.replace(/\s+/g, "")}`}
              className={`${styles.contactItem} interactive`}
            >
              {agency.phone}
            </a>
          </div>
        </div>

        <Footer showInfoLink={false} designCredit={designCredit} />
      </div>
    </>
  );
};

export default function Info() {
  return (
    <InfoPage
      photographerName="PHOTOGRAPHER NAME"
      email="IGORKLEPNEV@GMAIL.COM"
      instagram="INSTAGRAM"
      agency={{
        name: "EIGHT AGENCY",
        email: "NS@EIGHT-AGENCY.COM",
        phone: "+7 910 404 1850",
      }}
      designCredit="Developed by resonateur"
    />
  );
}
