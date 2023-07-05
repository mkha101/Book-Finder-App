import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
export const Book = ({
  title,
  subtitle,
  authors,
  thumbnail,
  isbn,
  openSummaryPopup,
}) => {
  const amazonLink = `https://www.amazon.com/dp/${isbn}`;
  const handleAmazonLinkClick = () => {
    window.open(amazonLink, "_blank");
  };

  return (
    <div className={styles.bookContainer}>
      <div id={styles.title2} className={styles.sect}>
        <h3 className={styles.category}>{title}</h3>
      </div>
      <div className={styles.sect}>
        {subtitle && <h4 className={styles.category}>{subtitle}</h4>}
      </div>
      <div className={styles.sect}>
        <p className={styles.category}>{authors.join(", ")}</p>
      </div>
      <div id={styles.amazonContainer} className={styles.sect}>
        <Image
          src="/images/amazon-logo.png"
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAmazonLinkClick}
          alt="amazonLogo"
          width={60}
          height={60}
          className={styles.amazonLogo}
        />
      </div>

      <div id={styles.thumb} className={styles.sect}>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Book Thumbnail"
            className={styles.bookThumbnail}
          />
        )}
      </div>
      <div id={styles.aiContainer} className={styles.sect}>
        <Image
          src="/images/ai-logo.png"
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          alt="aiLogo"
          width={60}
          height={60}
          className={styles.aiSummary}
          onClick={() => openSummaryPopup(title)}
        />
      </div>
    </div>
  );
};

export default Book;
