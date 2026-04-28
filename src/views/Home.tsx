import { useState, useEffect } from "react";
import LayoutCarrusel from "../components/Carrusel/LayoutCarrusel";
import CarruselList from "../components/Carrusel/CarruselList";
import { Book } from "../components/Books/types";
import Spinner from "../components/Spinner";
import StastCard from "../components/StatCard/StatCard";
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

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    completedBooks: 0,
    totalPagesRead: 0,
  });
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<object[] | null>(null);

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
          setStats(data?.data.stats);
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
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div>
            <StastCard
              books={stats.totalBooks}
              completed={stats.completedBooks}
              pages={stats.totalPagesRead}
            />
          </div>
          <LayoutCarrusel title="📚 Mis Libros">
            <CarruselList items={books} linkNavigate="/mybook" />
          </LayoutCarrusel>

          <LayoutCarrusel title="❤️ Mis Libros Favoritos">
            <CarruselList items={favoriteBooks} linkNavigate="/mybook" />
          </LayoutCarrusel>
        </>
      )}
    </>
  );
};

export default Home;
