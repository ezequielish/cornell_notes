import styles from "../components/Books/BookDetail.module.css";
import mainStyles from "../assets/main.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Book } from "../components/Books/types";
import { NoteCornell } from "../components/NotesCornell/types";
import BackIcon from "../components/Icons/Back";
import BookForm from "../components/Books/BookForm";
import NotesCornellForm from "../components/NotesCornell/NotesCornellForm";
import CarruselList from "../components/Carrusel/CarruselList";
import LayoutCarrusel from "../components/Carrusel/LayoutCarrusel";
import BookInfo from "../components/Books/BookInfo";
import Modal from "../components/Modal/Modal";
import BtnFavorite from "../components/BtnFavorite/BtnFavorite";
const STORAGE_KEY = "library_books";
const NOTES_KEY = "book_notes";

const MyBookDetail = () => {
  // Extraemos el bookmId de la URL
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [booksNotes, setBooksNotes] = useState<NoteCornell[] | []>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModalAddNote, setShowModalAddNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const getAllBooks = useCallback((): Book[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }, []);

  const getAllBookNotesbyBookId = useCallback((): NoteCornell[] => {
    let data = localStorage.getItem(NOTES_KEY);
    const json = data ? JSON.parse(data) : [];

    if (json) {
      // Aquí usamos bookId, por eso debe ir en las dependencias del useCallback
      const notes = json.filter(
        (note: NoteCornell) => note.bookId === Number(bookId),
      );
      return notes;
    }
    return [];
  }, [bookId]); // Se recrea solo si cambia bookId

  const getAllBookNotes = (): NoteCornell[] => {
    let data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    if (bookId) {
      const _notes = getAllBookNotesbyBookId();
      setBooksNotes(_notes);
    }
  }, [bookId, getAllBookNotesbyBookId]); // Se ejecuta cada vez que el ID en la URL cambie

  useEffect(() => {
    if (bookId) {
      const _books = getAllBooks();
      const _book = _books.find((b) => b.id === Number(bookId));
      if (_book) {
        setBook(_book);
      }
    }
  }, [bookId, getAllBooks]); // Se ejecuta cada vez que el ID en la URL cambie
  const handleEdit = async (editedBook: Book) => {
    const _books: Book[] = getAllBooks();

    // 1. Buscamos el índice del libro que queremos editar usando su ID
    const index = _books.findIndex((b) => b.id === editedBook.id);

    if (index !== -1) {
      // 2. Si existe, lo reemplazamos en esa posición exacta
      _books[index] = { ...editedBook };

      // 3. Guardamos el array actualizado en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_books));

      setIsEditing(false);
      setBook(editedBook);
    } else {
      console.error("Libro no encontrado");
    }
  };

  const handleFavorite = async (editedBook: any, isFavorite: boolean) => {
    const _books: Book[] = getAllBooks();

    // 1. Buscamos el índice del libro que queremos editar usando su ID
    const index = _books.findIndex((b) => b.id === editedBook.id);

    if (index !== -1) {
      // 2. Si existe, lo reemplazamos en esa posición exacta
      _books[index] = { ...editedBook, favorite: isFavorite };

      // 3. Guardamos el array actualizado en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_books));

      setBook(editedBook);
    } else {
      console.error("Libro no encontrado");
    }
  };
  const handleDelete = (idToDelete: number | string) => {
    const _books: Book[] = getAllBooks();

    const updatedBooks = _books.filter((book) => book.id !== idToDelete);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    navigate(`/mylibrary`);
  };

  const handleAddNote = (note: NoteCornell) => {
    const notes: NoteCornell[] = getAllBookNotes();

    // Calcula el nuevo ID basado en el máximo existente + 1
    const newId =
      notes.length > 0 ? Math.max(...notes.map((b) => Number(b.id))) + 1 : 1;

    if (book && book.id) {
      note.bookId = book.id;
    }

    if (typeof note.keywords == "string") {
      note.keywords = note.keywords.split("\n").filter(Boolean);
    }
    if (typeof note.notes == "string") {
      note.notes = note.notes.split("\n").filter(Boolean);
    }
    if (typeof note.summary == "string") {
      note.summary = note.summary.split("\n").filter(Boolean);
    }

    if (note.frontPage === "") {
      note.frontPage =
        "https://img.freepik.com/vector-gratis/linda-mascota-sobre-papel-azul_24877-82735.jpg?semt=ais_user_personalization&w=740&q=80";
    }
    notes.push({ ...note, id: newId });

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    setShowModalAddNote(false);
    const updatedBookNotes = getAllBookNotesbyBookId();
    setBooksNotes(updatedBookNotes);
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {!book && <div className={"styles.error"}>Libro no encontrado</div>}
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
                />
              ) : (
                <BookInfo book={book} />
              )}
            </div>

            <div className={styles.wrapper}>
              <LayoutCarrusel title={`Notas de ${book.title}`}>
                <CarruselList items={booksNotes} linkNavigate={`/mynote`} />
              </LayoutCarrusel>
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
                <button
                  type="button"
                  onClick={() => handleDelete(book.id || 0)}
                  className={mainStyles.btnDelete}
                >
                  Eliminar
                </button>
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
