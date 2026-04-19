import styles from "../assets/Mylibrary.module.css";
import mainStyles from "../assets/main.module.css";
import { useState, useEffect } from "react";
import { Book } from "../components/Books/types";
import BookGrid from "../components/Books/BookGrid";
import Spinner from "../components/Spinner";

const apiUrl = process.env.REACT_APP_API_URL;

interface Response {
  success: boolean;
  data: Book | Book[];
  message?: string;
  errors?: object[] | "";
}

const FavoriteBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<object[] | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      try {
        const params: any = {
          favorite: true,
        };
        const queryParams = new URLSearchParams(params).toString();

        const response = await fetch(`${apiUrl}/api/v1/books?${queryParams}`, {
          credentials: "include",
        });

        if (response.ok) {
          const data: Response = await response.json();

          setBooks(data?.data as Book[]);
        } else {
          console.error("Error fetching books:", response.statusText);
          throw [
            {
              message: "Error al cargar los libros",
            },
          ];
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error as object[]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);
  return (
    <>
      <div>
        <div className={styles.header}>
          <p className={mainStyles.title}>Mis Libros Favoritos </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </div>
          ) : books.length > 0 ? (
            <BookGrid books={books} />
          ) : error && error.length > 0  ? (
            <p
              style={{
                color: "red",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {error.map((err: any, index: number) => (
                <span key={index}>
                  {err.field && err.field} - {err.message}
                </span>
              ))}
            </p>
          ) : books.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No tienes libros favoritos aún. Agrega algunos desde tu biblioteca.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FavoriteBook;
