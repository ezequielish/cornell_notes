import styles from "../assets/Mylibrary.module.css";
import mainStyles from "../assets/main.module.css";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import { Book } from "../components/Books/types";
import BookForm from "../components/Books/BookForm";
import BookGrid from "../components/Books/BookGrid";
import Spinner from "../components/Spinner";

const apiUrl = process.env.REACT_APP_API_URL;

interface Response {
  success: boolean;
  data: {
    books: Book[];
    stats: {
      totalBooks: number;
      completedBooks: number;
      totalPagesRead: number;
    };
  };
  message?: string;
  errors?: object[] | "";
}

interface ResponseBook {
  success: boolean;
  data: Book;
  message?: string;
  errors?: object[] | "";
}

const MyLibrary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [error, setError] = useState<object[] | null>(null);

  const handleSave = async (newBook: Book) => {
    setIsLoadingBook(true);
    setError(null);
    if (newBook.frontPage === "") {
      newBook.frontPage =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    }

    const body = {
      ...newBook,
      year: Number(newBook.year),
      gender: Number(newBook.gender),
      pages: Number(newBook.pages),
    };
    try {
      const response = await fetch(`${apiUrl}/api/v1/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data: ResponseBook = await response.json();

      if (!data.success) {
        const _error: any =
          data.errors &&
          data.errors.map((err: any) => {
            return {
              field: err.field,
              message: err.message,
            };
          });

        throw new Error(JSON.stringify(_error));
      }
      const _newBook = data.data as Book;
      setIsModalOpen(false);
      const updatedBooks = [_newBook, ...books];
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error saving book:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setError([
            {
              message:
                "No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.",
            },
          ]);
          setBooks([]);
          return;
        }
      }
      setError(
        error instanceof Error
          ? JSON.parse(error.message)
          : [{ message: "Error desconocido" }],
      );
    } finally {
      setIsLoadingBook(false);
    }
  };

  // Cargar libros al iniciar
  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/v1/books`, {
          credentials: "include",
        });

        if (response.ok) {
          const data: Response = await response.json();

          if (!data.success) {
            console.error("Error fetching books:", response.statusText);
            const _error: any =
              data.errors &&
              data.errors.map((err: any) => {
                return {
                  field: err.field,
                  message: err.message,
                };
              });

            throw new Error(JSON.stringify(_error));
          }
          setBooks(data?.data.books as Book[]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        if (error instanceof Error) {
          if (error.message === "Failed to fetch") {
            setError([
              {
                message:
                  "No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.",
              },
            ]);
            setBooks([]);
            return;
          }
        }
        setError(
          error instanceof Error
            ? JSON.parse(error.message)
            : [{ message: "Error desconocido" }],
        );
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
          <p className={mainStyles.title}>Mi Biblioteca </p>

          <div className="">
            <button
              className={mainStyles.btnPrimary}
              onClick={() => setIsModalOpen(true)}
            >
              📖 Agregar Libro / Apuntes
            </button>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </div>
          ) : books.length > 0 ? (
            <BookGrid books={books} />
          ) : error && error.length > 0 && !isModalOpen ? (
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
              No hay libros en tu biblioteca
            </p>
          ) : null}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <BookForm
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
          loading={isLoadingBook}
        />
        {error && error.length > 0 && isModalOpen ? (
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
                {err.field} - {err.message}
              </span>
            ))}
          </p>
        ) : null}
      </Modal>
    </>
  );
};

export default MyLibrary;
