import React from "react";
import styles from "./BookGrid.module.css";
import { Book } from "./types";
import { Link } from "react-router-dom";
interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.grid}>
        {books.map((book) => (
          <Link to={`/mybook/${book.id}`} key={book.id}>
            <li className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    book.frontPage ||
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  alt={book.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{book.title}</h3>
                <p>{book.author}</p>
                {book.pages && <p>{book.pages} pag/módulos</p>}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BookGrid;
