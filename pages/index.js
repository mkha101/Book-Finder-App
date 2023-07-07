import React, { useState } from "react";
import axios from "axios";
import Book from "../components/Book";
import styles from "../styles/Home.module.css";
import { title } from "../components/Book.js";
import Footer from "../components/Footer";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter search term first");
    } else {
      setErrorMessage("");
      setLoadingBooks(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await axios.get(
          `${API_URL}?q=${searchTerm}&maxResults=5`
        );

        const bookData = response.data.items;
        const bookList = bookData.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          isbn: book.volumeInfo.industryIdentifiers?.find(
            (identifier) => identifier.type === "ISBN_10"
          )?.identifier,
          authors: book.volumeInfo.authors || [],
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        }));
        setShowCategories(true);
        setBooks(bookList);
        setLoadingBooks(false);

        console.log(bookList);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [summary, setSummary] = useState(null);

  const generateBookSummary = async (title) => {
    setLoadingSummary(true);

    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      const data = await response.json();
      const summary = data.summary;
      setSummary(summary);
      setLoadingSummary(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openSummaryPopup = (title) => {
    generateBookSummary(title);
  };

  const closeSummaryPopup = () => {
    setSummary(null);
  };
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.title}>
          <a href="">
            {" "}
            <h1 className={styles.titleh1}>
              {" "}
              Book<span>Finder</span>
            </h1>
          </a>
        </div>
        <div className={styles.info}>
          <p>Get information on any book and generate a summary using Ai.</p>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            placeholder="Enter search term"
          />
        </div>
        <button onClick={handleSearch} className={styles.searchButton}>
          Search Books
        </button>
        {errorMessage && (
          <div className={styles.error}>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className={styles.loading}>
          {loadingBooks && <span className={styles.loader}></span>}
        </div>{" "}
        <div className={styles.bookList}>
          {showCategories && (
            <div className={styles.categories}>
              <div className={styles.cat}>
                <span>Title</span>
              </div>
              <div className={styles.cat}>
                <span>Subtitle</span>
              </div>
              <div className={styles.cat}>
                <span>Author</span>
              </div>{" "}
              <div className={styles.cat}>
                <span>Shop</span>
              </div>
              <div className={styles.cat}>
                <span>Thumbnail</span>
              </div>
              <div id={styles.ai_cat} className={styles.cat}>
                <span>Ai Summary</span>
              </div>
            </div>
          )}
          {books.map((book) => (
            <Book key={book.id} openSummaryPopup={openSummaryPopup} {...book} />
          ))}
        </div>
        <div className={styles.loading}>
          {loadingSummary && <span className={styles.loader}></span>}
        </div>{" "}
        {summary && (
          <div className={styles.summaryPopup}>
            <div className={styles.summaryContent}>
              <h1 className={styles.aiTitle}>Ai Generated Summary:</h1>
              <h3 className={styles.summaryTitle}>{title}</h3>
              <p className={styles.summaryText}>{summary}</p>
              <button
                className={styles.closeButton}
                onClick={closeSummaryPopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
