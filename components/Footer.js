import React from "react";
import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <span>© Copyright 2023. All Right Reserved</span>
        <span>|</span>
        <span>Made by Muzamil Khan</span>
      </div>
    </footer>
  );
}

export default Footer;
