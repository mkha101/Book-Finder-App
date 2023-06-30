import React from "react";
import styles from "../styles/Home.module.css";

const Book = ({ title, subtitle, authors, thumbnail }) => {
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

      <div id={styles.thumb} className={styles.sect}>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Book Thumbnail"
            className={styles.bookThumbnail}
          />
        )}
      </div>
    </div>
  );
};

export default Book;
