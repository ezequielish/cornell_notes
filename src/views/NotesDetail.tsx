import styles from "../assets/NotesDetail.module.css";
import mainStyles from "../assets/main.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { NoteCornell } from "../components/NotesCornell/types";
import BackIcon from "../components/Icons/Back";
import NotesCornellForm from "../components/NotesCornell/NotesCornellForm";
import Modal from "../components/Modal/Modal";

const NOTES_KEY = "book_notes";

const NotesDetail = () => {
  // Extraemos el bookmId de la URL
  const initialNote: NoteCornell = {
    id: "",
    title: "",
    date: "",
    bookId: "",
    notes: [],
    aiSummary: [],
    summary: [],
    images: [],
    theme: "",
    startPage: 0,
    endPage: 0,
    frontPage: "",
  };
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<NoteCornell>(initialNote);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const noteById = useCallback(
    (id: string, _note: NoteCornell): NoteCornell => {
      const data = localStorage.getItem(NOTES_KEY);
      const json = data ? JSON.parse(data) : [];

      if (json) {
        const foundNote = json.find(
          (note: NoteCornell) => note.id === Number(id),
        );
        return foundNote || _note;
      }
      return _note;
    },
    [],
  );

  const getAllBookNotes = (): NoteCornell[] => {
    let data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  };

  const handleCancel = () => {
    setIsEditing(false);
    // if (typeof note.notes == "string") {
    //   // note.notes = note.notes.split("\n").filter(Boolean);
    // }
    if (typeof note.summary == "string") {
      note.summary = note.summary.split("\n").filter(Boolean);
    }
  };
  useEffect(() => {
    //Obtenemos las notas de localStorage
    if (id && note.id === "") {
      const _note = noteById(id, note);

      if (_note) {
        setNote(_note);
      }
    }
  }, [id, note, noteById]); // Se ejecuta cada vez que el ID en la URL cambie

  if (!note) {
    return <div className={"styles.error"}>Nota no encontrado</div>;
  }

  const handleEdit = async (editNote: NoteCornell) => {
    const _notes: NoteCornell[] = getAllBookNotes();

    const index = _notes.findIndex((b) => b.id === editNote.id);

    if (index !== -1) {
      // if (typeof editNote.notes == "string") {
      //   editNote.notes = editNote.notes.split("\n").filter(Boolean);
      // }
      if (typeof editNote.summary == "string") {
        editNote.summary = editNote.summary.split("\n").filter(Boolean);
      }
      _notes[index] = { ...editNote };
      localStorage.setItem(NOTES_KEY, JSON.stringify(_notes));
      setIsEditing(false);
      setNote(editNote);
    } else {
      console.error("Nota no encontrada");
    }
  };
  const handleDelete = (idToDelete: number | string) => {
    const _notes: NoteCornell[] = getAllBookNotes();
    const updatedNote = _notes.filter((note) => note.id !== idToDelete);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNote));

    navigate(`/mybook/${note.bookId}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button className={mainStyles.button} onClick={goBack}>
        <BackIcon />
      </button>
      <div className={styles.actionsWrapper}>
        {/* <button
          className={mainStyles.btnPrimary}
          onClick={() => setShowModalAddNote(true)}
        >
          📖 Agregar Notas
        </button> */}
        <button
          className={mainStyles.button}
          onClick={() => setIsEditing(true)}
        >
          ✏️ Editar nota
        </button>
        <button
          className={mainStyles.btnDelete}
          onClick={() => setIsDeleting(!isDeleting)}
        >
          🗑️ Eliminar nota
        </button>
      </div>
      {!isEditing && (
        <div className={styles.cornellContainer}>
          <h1>{note.title}</h1>
          <header className={styles.header}>
            <div className={styles.field}>
              <span className={styles.label}>Fecha:</span> {note.date}
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Tema:</span> {note.theme}
            </div>
          </header>

          <div className={styles.mainArea}>
            {/* Sección de Palabras Clave (Columna Izquierda) */}
            {/* <section className={styles.keywordsSection}>
              <h3 className={styles.keywordsTitle}>Palabras Clave</h3>
              <ul className={styles.contentList}>
                {typeof note.keywords != "string" &&
                  note.keywords.map((keyword: any, index: number) => (
                    <li key={index}>{keyword}</li>
                  ))}
              </ul>
            </section> */}

            {/* Sección de Notas Principales (Columna Derecha) */}
            <section className={styles.notesSection}>
              <h3 className={styles.notesTitle}>Notas Principales</h3>
              <ul className={styles.contentList}>
                {typeof note.notes != "string" &&
                  note.notes.map((note: any, index: number) => (
                    <li key={index}>● {note}</li>
                  ))}
              </ul>
            </section>
          </div>

          {/* Sección de Resumen (Fila Inferior) */}
          <footer className={styles.summarySection}>
            <h3 className={styles.summaryTitle}>Resumen</h3>
            <ul className={styles.contentList}>
              {typeof note.summary != "string" &&
                note.summary.map((summary: any, index: number) => (
                  <li key={index}>{summary}</li>
                ))}
            </ul>
          </footer>
        </div>
      )}

      {note.id && isEditing && (
        <NotesCornellForm
          onSave={handleEdit}
          onCancel={handleCancel}
          edit={true}
          noteCornell={note}
        />
      )}

      <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)} title="">
        <div className={styles.deleteWrapper}>
          <p>🗑️ Deseas eliminar esta Nota?</p>

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
              onClick={() => handleDelete(note.id || 0)}
              className={mainStyles.btnDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NotesDetail;
