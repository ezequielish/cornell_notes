import styles from "../components/Books/BookDetail.module.css";
import mainStyles from "../assets/main.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Book } from "../components/Books/types";
import { NoteCornell } from "../components/NotesCornell/types";
import BackIcon from "../components/Icons/Back";
import BookForm from "../components/Books/BookForm";
import NotesCornellForm from "../components/NotesCornell/NotesCornellForm";
// import CarruselList from "../components/Carrusel/CarruselList";
// import LayoutCarrusel from "../components/Carrusel/LayoutCarrusel";
import BookInfo from "../components/Books/BookInfo";
import Modal from "../components/Modal/Modal";
import BtnFavorite from "../components/BtnFavorite/BtnFavorite";
import Spinner from "../components/Spinner";

const apiUrl = process.env.REACT_APP_API_URL;
interface Response {
  success: boolean;
  data: Book | Book[];
  message?: string;
  errors?: object[] | "";
}
const MyBookDetail = () => {
  // Extraemos el bookmId de la URL
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  // const [booksNotes, setBooksNotes] = useState<NoteCornell[] | []>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModalAddNote, setShowModalAddNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBook, setIsLoadingBook] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      if (bookId) {
        setIsLoading(true);
        try {
          const response = await fetch(`${apiUrl}/api/v1/books/${bookId}`, {
            credentials: "include",
          });

          const data = await response.json();

          if (!data.success) {
            const _error: any =
              data.errors &&
              data.errors.map((err: any) => {
                return {
                  field: err.field,
                  message: err.message,
                };
              });

            throw new Error(_error);
          }
          setBook(data.data);
        } catch (error) {
          console.error("Error fetching book:", error);
          setError(error as object[]);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchBook();
  }, [bookId]); // Se ejecuta cada vez que el ID en la URL cambie
  const handleEdit = async (editedBook: Book) => {
    setIsLoadingBook(true);
    const body = {
      ...editedBook,
      year: Number(editedBook.year),
      gender: Number(editedBook.gender),
      pages: Number(editedBook.pages),
      favorite: editedBook.favorite || false,
    };
    try {
      const response = await fetch(`${apiUrl}/api/v1/books/${editedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data: Response = await response.json();

      if (!data.success) {
        const _error: any =
          data.errors &&
          data.errors.map((err: any) => {
            return {
              field: err.field,
              message: err.message,
            };
          });

        throw new Error(_error);
      }
      const _newBook = data.data as Book;
      setBook(_newBook);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving book:", error);
      setError(error as object[]);
    } finally {
      setIsLoadingBook(false);
    }
  };

  const handleFavorite = async (editedBook: any, isFavorite: boolean) => {
    const body = {
      favorite: isFavorite,
    };
    try {
      const response = await fetch(`${apiUrl}/api/v1/books/${editedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data: Response = await response.json();

      if (!data.success) {
        const _error: any =
          data.errors &&
          data.errors.map((err: any) => {
            return {
              field: err.field,
              message: err.message,
            };
          });

        throw new Error(_error);
      }
      const _newBook = data.data as Book;
      setBook(_newBook);
    } catch (error) {
      console.error("Error saving book:", error);
      setError(
        error instanceof Error
          ? JSON.parse(error.message)
          : [{ message: "Error desconocido" }],
      );
    } finally {
      setIsLoadingBook(false);
    }
  };
  const handleDelete = async (idToDelete: string | number) => {
    try {
      setIsLoadingBook(true);
      const response = await fetch(`${apiUrl}/api/v1/books/${idToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        const _error: any =
          data.errors &&
          data.errors.map((err: any) => {
            return {
              field: err.field,
              message: err.message,
            };
          });

        throw new Error(_error);
      }
      navigate("/mylibrary");
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(
        error instanceof Error
          ? JSON.parse(error.message)
          : [{ message: "Error desconocido" }],
      );
    } finally {
      setIsLoadingBook(false);
    }
  };

  const handleAddNote = (note: NoteCornell) => {
    // const notes: NoteCornell[] = getAllBookNotes();
    // // Calcula el nuevo ID basado en el máximo existente + 1
    // const newId =
    //   notes.length > 0 ? Math.max(...notes.map((b) => Number(b.id))) + 1 : 1;
    // if (book && book.id) {
    //   note.bookId = book.id;
    // }
    // if (typeof note.keywords == "string") {
    //   note.keywords = note.keywords.split("\n").filter(Boolean);
    // }
    // if (typeof note.notes == "string") {
    //   note.notes = note.notes.split("\n").filter(Boolean);
    // }
    // if (typeof note.summary == "string") {
    //   note.summary = note.summary.split("\n").filter(Boolean);
    // }
    // if (note.frontPage === "") {
    //   note.frontPage =
    //     "https://img.freepik.com/vector-gratis/linda-mascota-sobre-papel-azul_24877-82735.jpg?semt=ais_user_personalization&w=740&q=80";
    // }
    // notes.push({ ...note, id: newId });
    // localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    // setShowModalAddNote(false);
    // const updatedBookNotes = getAllBookNotesbyBookId();
    // setBooksNotes(updatedBookNotes);
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      )}
      {error && error.length > 0 ? (
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
      {!book && !isLoading && (
        <div style={{ textAlign: "center" }}>Libro no encontrado</div>
      )}
      {book && (
        <>
          <div className={styles.container}>
            <button
              className={`${mainStyles.button} ${styles.backBtn} `}
              onClick={goBack}
            >
              <BackIcon />
            </button>
            <div className={styles.header}>
              <div className={styles.actionsWrapper}>
                <button
                  className={mainStyles.btnPrimary}
                  onClick={() => setShowModalAddNote(true)}
                >
                  📖 Agregar Notas
                </button>
                <button
                  className={mainStyles.button}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  ✏️ Editar Libro
                </button>
                <button
                  className={mainStyles.btnDelete}
                  onClick={() => setIsDeleting(!isDeleting)}
                >
                  🗑️ Eliminar Libro
                </button>
              </div>
            </div>
            <div className={styles.wrapperHeader}>
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
                <div className={"flex"}>
                  <h1 className={styles.title}>{book.title} </h1>
                  <BtnFavorite
                    initialStatus={book.favorite ?? false}
                    item={book}
                    onToggle={handleFavorite}
                  />
                </div>
                <p className={styles.metadata}>
                  {book.author} | {book.year}
                </p>
              </div>
            </div>

            <div className={styles.wrapper}>
              {isEditing ? (
                <BookForm
                  onSave={handleEdit}
                  onCancel={() => setIsEditing(false)}
                  edit={true}
                  book={book}
                  loading={isLoadingBook}
                />
              ) : (
                <BookInfo book={book} />
              )}
            </div>

            <div className={styles.wrapper}>
              {/* <LayoutCarrusel title={`Notas de ${book.title}`}>
                <CarruselList items={booksNotes} linkNavigate={`/mynote`} />
              </LayoutCarrusel> */}
            </div>
            {/* Aquí vas puntuación y progreso */}
          </div>
          <Modal
            isOpen={isDeleting}
            onClose={() => setIsDeleting(false)}
            title=""
          >
            <div className={styles.deleteWrapper}>
              <p>🗑️ Deseas eliminar este Libro?</p>

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  className={mainStyles.btnCancel}
                >
                  Cancelar
                </button>
                {isLoadingBook ? (
                  <Spinner />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDelete(book.id || "")}
                    className={mainStyles.btnDelete}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={showModalAddNote}
            onClose={() => setShowModalAddNote(false)}
            title=""
          >
            <NotesCornellForm
              onSave={handleAddNote}
              onCancel={() => setShowModalAddNote(false)}
              edit={false}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default MyBookDetail;
