import styles from "./NotesCornellForm.module.css";
import mainStyles from "../../assets/main.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { NoteCornell, NoteCornellProps } from "./types.ts";
const NotesCornellForm: React.FC<NoteCornellProps> = ({
  onSave,
  onCancel,
  noteCornell,
  edit = false,
}) => {
  const initialState: NoteCornell = {
    title: "",
    bookId: "",
    date: "",
    keywords: [],
    aiSummary: [],
    summary: [],
    images: [],
    notes: [],
    theme: "",
    startPage: 0,
    endPage: 0,
    frontPage: "",
  };

  // 1. Definimos la validación aquí mismo (o se puede importar de un archivo aparte)
  const validateForm = (values: NoteCornell) => {
    const errors: any = {};
    if (!values.title.trim()) errors.title = "El título es obligatorio";
    if (!values.date.trim()) errors.date = "La fecha es obligatoria";
    if (!values.keywords.length)
      errors.keywords = "Las palabras claves son obligatorias";
    if (!values.notes.length) errors.notes = "Las notas son obligatorias";
    if (!values.summary.length)
      errors.summary = "Las palabras claves son obligatorias";

    return errors;
  };

  //Hook Form
  const { values, errors, handleChange, handleSubmit, setValues } =
    useForm<NoteCornell>(initialState, validateForm);

  // Efecto para cargar datos si estamos editando
  useEffect(() => {
    if (edit && noteCornell) {
      if (typeof noteCornell.keywords != "string") {
        noteCornell.keywords = noteCornell.keywords.join("\n");
      }

      if (typeof noteCornell.notes != "string") {
        noteCornell.notes = noteCornell.notes.join("\n");
      }

      if (typeof noteCornell.summary != "string") {
        noteCornell.summary = noteCornell.summary.join("\n");
      }

      setValues({ ...noteCornell });
    }
  }, []);

  return (
    <div className={styles.container}>
      {!edit && <h2>{"📖 Agregar nueva nota"}</h2>}

      <form
        className={edit ? styles.form : styles.formModal}
        onSubmit={(e) => handleSubmit(e, onSave)}
      >
        <div>
          <div className={mainStyles.input}>
            <label>Titulo *</label>
            <input
              type="text"
              name="title"
              className={errors.title ? mainStyles.inputError : ""}
              value={values.title}
              onChange={handleChange}
              placeholder="Resumen de La fotosíntesis"
              autoComplete="off"
            />
            {errors.title && (
              <span className={mainStyles.errorText}>{errors.title}</span>
            )}
          </div>
        </div>
        <div className={styles.formGrid}>
          <div className={mainStyles.input}>
            <label>N° de pag donde iniciaste</label>
            <input
              type="number"
              name="startPage"
              className={errors.startPage ? mainStyles.inputError : ""}
              value={values.startPage}
              onChange={handleChange}
              placeholder="1"
              autoComplete="off"
            />
            {errors.startPage && (
              <span className={mainStyles.errorText}>{errors.startPage}</span>
            )}
          </div>

          <div className={mainStyles.input}>
            <label>N° de pag donde quedaste</label>
            <input
              type="number"
              name="endPage"
              className={errors.endPage ? mainStyles.inputError : ""}
              value={values.endPage}
              onChange={handleChange}
              placeholder="1"
              autoComplete="off"
            />
            {errors.endPage && (
              <span className={mainStyles.errorText}>{errors.endPage}</span>
            )}
          </div>
        </div>
        <div className={styles.formGrid}>
          <div className={mainStyles.input}>
            <label>Fecha de la nota</label>
            <input
              type="date"
              name="date"
              className={errors.date ? mainStyles.inputError : ""}
              value={values.date}
              onChange={handleChange}
              placeholder="1"
              autoComplete="off"
            />
            {errors.date && (
              <span className={mainStyles.errorText}>{errors.date}</span>
            )}
          </div>
          <div className={mainStyles.input}>
            <label>Tema </label>
            <input
              type="text"
              name="theme"
              className={errors.theme ? mainStyles.inputError : ""}
              value={values.theme}
              onChange={handleChange}
              placeholder="La fotosíntesis"
              autoComplete="off"
            />
            {errors.theme && (
              <span className={mainStyles.errorText}>{errors.theme}</span>
            )}
          </div>
        </div>
        <div className={styles.formGrid}>
          <div className={mainStyles.input}>
            <label>Palabras Claves *</label>
            <textarea
              name="keywords"
              rows={6}
              style={{ resize: "none" }}
              className={errors.keywords ? mainStyles.inputError : ""}
              value={values.keywords}
              onChange={handleChange}
              placeholder="- Palabras clave separadas por salto de linea"
              autoComplete="off"
            />
            {errors.keywords && (
              <span className={mainStyles.errorText}>{errors.keywords}</span>
            )}
          </div>

          <div className={mainStyles.input}>
            <label>Notas *</label>
            <textarea
              name="notes"
              rows={6}
              style={{ resize: "none" }}
              className={errors.keywords ? mainStyles.inputError : ""}
              value={values.notes}
              onChange={handleChange}
              placeholder="- Párrafos separados por salto de linea"
              autoComplete="off"
            />
            {errors.notes && (
              <span className={mainStyles.errorText}>{errors.notes}</span>
            )}
          </div>
        </div>
        <div>
          <div className={mainStyles.input}>
            <label>Resumen *</label>
            <textarea
              name="summary"
              rows={6}
              style={{ resize: "none" }}
              className={errors.keywords ? mainStyles.inputError : ""}
              value={values.summary}
              onChange={handleChange}
              placeholder="- Párrafos separados por salto de linea"
              autoComplete="off"
            />
            {errors.summary && (
              <span className={mainStyles.errorText}>{errors.summary}</span>
            )}
          </div>
        </div>
        <div className={edit ? styles.actions : styles.actionsModal}>
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

export default NotesCornellForm;
