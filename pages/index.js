import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import Book from "../components/Book";
import styles from "../styles/Home.module.css";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?q=${searchTerm}&maxResults=3`
      );

      const bookData = response.data.items;
      const bookList = bookData.map((book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors || [],
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      }));
      setShowCategories(true);
      setBooks(bookList);
      console.log(bookList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

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

        <div className={styles.bookList}>
          {showCategories && (
            <div className={styles.categories}>
              <span>Title</span>
              <span>Subtitle</span>
              <span>Author</span>
              <span>Thumbnail</span>
            </div>
          )}
          {books.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </main>

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
