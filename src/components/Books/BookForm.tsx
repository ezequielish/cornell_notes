import styles from "./BookForm.module.css"; 
import mainStyles from "../../assets/main.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { Book, BookFormProps, FormErrors } from "./types";
import data from "../../data/gender.json";
const BookForm: React.FC<BookFormProps> = ({
  onSave,
  onCancel,
  book,
  edit = false,
}) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const initialState: Book = {
    title: "",
    author: "",
    frontPage: "",
    gender: 0,
    year: "",
    pages: 0,
    description: "",
  };

  // 1. Definimos la validación aquí mismo (o se puede importar de un archivo aparte)
  const validateBookForm = (values: Book) => {
    const errors: any = {};
    if (!values.title.trim()) errors.title = "El título es obligatorio";
    if (!values.author.trim()) errors.author = "El autor es obligatorio";
    if (values.pages == 0) errors.pages = "El número de paginas es obligatorio";
    if (values.gender == 0) errors.gender = "La categoria es obligatoria";

    return errors;
  };

  //Hook Form
  const { values, errors, handleChange, handleSubmit, setValues } =
    useForm<Book>(initialState, validateBookForm);

  // Efecto para cargar datos si estamos editando
  useEffect(() => {
    if (edit && book) {
      setValues({ ...book });
    }
  }, []);

  useEffect(() => {
    // Si el input está vacío, reseteamos
    if (values.frontPage === "") {
      setIsValid(false);
      return;
    }

    // Esperar 800ms después de que el usuario deje de escribir
    const handler = setTimeout(() => {
      const img = new Image();
      img.onload = () => setIsValid(true);
      img.onerror = () => setIsValid(false);
      img.src = values.frontPage;
    }, 800);

    // Limpiar el timeout si el usuario vuelve a escribir antes de los 800ms
    return () => clearTimeout(handler);
  }, [values.frontPage]);

  return (
    <div className={styles.container}>
      {!edit && <h2>{"📖 Agregar Nuevo Libro/Apuntes"}</h2>}

      <form onSubmit={(e) => handleSubmit(e, onSave)}>
        <div className={styles.formGrid}>
          <div className={styles.column}>
            <div className={mainStyles.input}>
              <label>Título *</label>
              <input
                type="text"
                name="title"
                className={errors.title ? mainStyles.inputError : ""}
                value={values.title}
                onChange={handleChange}
                placeholder="Ej. El Psicoanalista"
                autoComplete="off"
              />
              {errors.title && (
                <span className={mainStyles.errorText}>{errors.title}</span>
              )}
            </div>

            <div className={mainStyles.input}>
              <label>Autor *</label>
              <input
                type="text"
                name="author"
                className={errors.author ? mainStyles.inputError : ""}
                value={values.author}
                onChange={handleChange}
                placeholder="Ej. John Katzenbach"
                autoComplete="off"
              />
              {errors.author && (
                <span className={mainStyles.errorText}>{errors.author}</span>
              )}
            </div>
            <div className={mainStyles.input}>
              <label>Año</label>
              <input
                type="text"
                name="year"
                className={errors.year ? mainStyles.inputError : ""}
                value={values.year}
                onChange={handleChange}
                placeholder="2014"
                autoComplete="off"
              />
              {errors.year && (
                <span className={mainStyles.errorText}>{errors.year}</span>
              )}
            </div>
            <div className={mainStyles.input}>
              <label>Categoria</label>
              <select
                name="gender"
                onChange={handleChange}
                value={values.gender}
              >
                <option value={0}>Seleccione una categoria</option>
                {data.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className={mainStyles.errorText}>{errors.gender}</span>
              )}
            </div>
          </div>
          <div className={styles.column}>
            <div className={mainStyles.input}>
              <label>Número de Páginas *</label>
              <input
                type="number"
                name="pages"
                className={errors.pages ? mainStyles.inputError : ""}
                value={values.pages}
                onChange={handleChange}
                placeholder="352"
                autoComplete="off"
              />
              {errors.pages && (
                <span className={mainStyles.errorText}>{errors.pages}</span>
              )}
            </div>
            <div className={mainStyles.input}>
              <label>Url de la portada</label>
              <input
                type="url"
                name="frontPage"
                className={errors.frontPage ? mainStyles.inputError : ""}
                value={values.frontPage}
                onChange={handleChange}
                placeholder="https://example.com"
                autoComplete="off"
              />
              {errors.frontPage && (
                <span className={mainStyles.errorText}>{errors.frontPage}</span>
              )}
            </div>
            <div className={styles.wrapperImg}>
              {isValid ? (
                <img src={values.frontPage} alt={values.title} />
              ) : (
                <span className={styles.errorText}>La imagen no es valida</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={mainStyles.btnCancel}
          >
            Cancelar
          </button>
          <button type="submit" className={mainStyles.btnGuardar}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
