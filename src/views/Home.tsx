import { useState, useEffect } from "react";
import LayoutCarrusel from "../components/Carrusel/LayoutCarrusel";
import CarruselList from "../components/Carrusel/CarruselList";
import { Book } from "../components/Books/types";
const STORAGE_KEY = "library_books";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  const getAllBooks = (): Book[] => {
    let data = localStorage.getItem(STORAGE_KEY);
    const json = data ? JSON.parse(data) : [];
    setBooks(json);
    if (json) {
      const _book = json.filter((book: Book) => book.favorite === true);
      return _book;
    }
    return [];
  };

  // Cargar libros al iniciar
  useEffect(() => {
    const favorites = getAllBooks();
    if (favorites) setFavoriteBooks(favorites);
  }, []);
  return (
    <>
      <LayoutCarrusel title="📚 Mis Libros">
        <CarruselList items={books} linkNavigate="/mybook" />
      </LayoutCarrusel>

      <LayoutCarrusel title="❤️ Mis Libros Favoritos">
        <CarruselList items={favoriteBooks} linkNavigate="/mybook" />
      </LayoutCarrusel>
    </>
  );
};

export default Home;
