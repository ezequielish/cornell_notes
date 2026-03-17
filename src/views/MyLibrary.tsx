import styles from "../assets/Mylibrary.module.css";
import mainStyles from "../assets/main.module.css";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal.tsx";
import { Book } from "../components/Books/types.ts";
import BookForm from "../components/Books/BookForm.tsx";
import BookGrid from "../components/Books/BookGrid.tsx";

const STORAGE_KEY = "library_books";

const MyLibrary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const getAllBooks = (): Book[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };
  const handleSave = async (newBook: Book) => {
    const books: Book[] = getAllBooks();

    // Calcula el nuevo ID basado en el máximo existente + 1
    const newId =
      books.length > 0 ? Math.max(...books.map((b) => Number(b.id))) + 1 : 1;

    if (newBook.frontPage === "") {
      newBook.frontPage =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    }
    books.push({ ...newBook, id: newId });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    setIsModalOpen(false);
    const updatedBooks = getAllBooks();
    setBooks(updatedBooks);
  };

  // Cargar libros al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setBooks(JSON.parse(saved));
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
          <BookGrid books={books} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <BookForm onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default MyLibrary;
