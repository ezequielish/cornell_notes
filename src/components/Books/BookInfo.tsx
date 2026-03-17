import styles from "./BookForm.module.css"; 
import mainStyles from "../../assets/main.module.css";
import { useState, useEffect } from "react";
import data from "../../data/gender.json";
import { Book, BookFormProps, FormErrors } from "./types";

const BookInfo = ({ book }: { book: Book }) => {
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const _category = data.genres.find((c: any) => c.id == book?.gender);
    if (_category) setCategory(_category.label);
  }, []); //

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        <div className={styles.column}>
          <div className={mainStyles.input}>
            <label>Título </label>
            <p className={mainStyles.input}>{book.title}</p>
          </div>

          <div className={mainStyles.input}>
            <label>Autor </label>
            <p className={mainStyles.input}>{book.author}</p>
          </div>
          <div className={mainStyles.input}>
            <label>Año </label>
            <p className={mainStyles.input}>{book.year}</p>
          </div>
          <div className={mainStyles.input}>
            <label>Categoria </label>
            <p className={mainStyles.input}>{category}</p>
          </div>
        </div>
        <div className={styles.column}>
          <div className={mainStyles.input}>
            <label>Número de Páginas </label>
            <p className={mainStyles.input}>{book.pages}</p>
          </div>
          <div className={mainStyles.input}>
            <label>Portada </label>
            <div className={styles.wrapperImg}>
              <img src={book.frontPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
