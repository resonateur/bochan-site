import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/InfoPage.module.css";

// Plain JavaScript function
export default function Info() {
  const photographerName = "YURI BOCHAN";

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Head,
      null,
      React.createElement("title", null, "Info | " + photographerName),
      React.createElement("meta", {
        name: "description",
        content: "Contact information for photographer",
      })
    ),
    React.createElement(
      "div",
      { className: styles.infoContainer },
      React.createElement(Header, { photographerName: photographerName }),
      React.createElement(
        "div",
        { className: styles.infoContent },
        React.createElement(
          "div",
          { className: styles.contactSection },
          React.createElement(
            "a",
            {
              href: "mailto:bochan.art@GMAIL.COM",
              className: styles.contactItem + " interactive",
            },
            "bochan.art@GMAIL.COM"
          ),
          React.createElement(
            "a",
            {
              href: "https://www.instagram.com/genderlybae/",
              className: styles.contactItem + " interactive",
            },
            "INSTAGRAM"
          ),
          React.createElement(
            "a",
            {
              href: "tel:+380965599205",
              className: styles.contactItem + " interactive",
            },
            "+380 96 559 92 05"
          )
        )
      ),
      React.createElement(Footer, {
        showInfoLink: false,
        designCredit: "Developed by resonateur",
      })
    )
  );
}
