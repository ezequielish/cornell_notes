import styles from "../assets/Mylibrary.module.css";
import mainStyles from "../assets/main.module.css";
import { useRef, useState, useEffect } from "react";
import { Book } from "../components/Books/types.ts";
import BookGrid from "../components/Books/BookGrid.tsx";

const STORAGE_KEY = "library_books";

const FavoriteBook = ({}) => {
  const [books, setBooks] = useState<Book[]>([]);

  const getAllBooks = (): Book[] => {
    let data = localStorage.getItem(STORAGE_KEY);
    const json = data ? JSON.parse(data) : [];
    if (json) {
      const _book = json.filter((book: Book) => book.favorite === true);
      return _book;
    }
    return [];
  };

  // Cargar libros al iniciar
  useEffect(() => {
    const favorites = getAllBooks();
    if (favorites) setBooks(favorites);
  }, []);
  return (
    <>
      <div>
        <div className={styles.header}>
          <p className={mainStyles.title}>Mis Libros Favoritos </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <BookGrid books={books} />
        </div>
      </div>
    </>
  );
};

export default FavoriteBook;
