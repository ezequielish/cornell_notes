import { useRef, useState, useEffect } from "react";
import styles from "./Carrusel.module.css";
import { Link } from "react-router-dom";

interface CarruselListProps {
  items: any[];
  linkNavigate?: string;
}

const CarruselList = ({ items, linkNavigate }: CarruselListProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showArrows, setShowArrows] = useState<boolean>(false);

  /**
   * Comprueba si el área desplazable de la lista del carrusel excede su área visible.
   * En caso de asi sea, es decir para desktop, mostrará las flechas de navegación.
   */
  const checkOverflow = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowArrows(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [items]);

  //  Tipamos el parámetro direction como un "literal type" para mayor seguridad
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
      {showArrows && (
        <button
          className={`${styles.btnNav} ${styles.prev}`}
          onClick={() => scroll("left")}
        >
          &#10094;
        </button>
      )}
      <ul className={styles.carruselList} ref={scrollRef}>
        {items.map((item: any, index) => {
          if (linkNavigate) {
            return (
              <Link to={`${linkNavigate}/${item.id}`} key={item.id}>
                <li className={styles.carruselItem} >
                  <img src={item.frontPage} alt={item.title} />
                  <h3>{item.title}</h3>
                  {item.date && <p>{item.date}</p>}
                </li>
              </Link>
            );
          }
          return (
            <li className={styles.carruselItem} key={item.id}>
              <img src={item.frontPage} alt={item.title} />
              <h3>{item.title}</h3>
              {item.date && <p>{item.date}</p>}
            </li>
          );
        })}
      </ul>
      {showArrows && (
        <button
          className={`${styles.btnNav} ${styles.next}`}
          onClick={() => scroll("right")}
        >
          &#10095;
        </button>
      )}
    </>
  );
};

export default CarruselList;
