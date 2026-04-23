import styles from "../assets/NotesDetail.module.css";
import mainStyles from "../assets/main.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NoteCornell } from "../components/NotesCornell/types";
import BackIcon from "../components/Icons/Back";
import NotesCornellForm from "../components/NotesCornell/NotesCornellForm";
import Modal from "../components/Modal/Modal";
import Spinner from "../components/Spinner";

const apiUrl = process.env.REACT_APP_API_URL;
interface Response {
  success: boolean;
  data: NoteCornell;
  message?: string;
  errors?: object[] | "";
}

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<object[] | null>(null);
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    async function fetchNote() {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}/api/v1/notes/${id}`, {
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
          setNote(data.data);
        } catch (error) {
          console.error("Error fetching note:", error);
          setError(error as object[]);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchNote();
  }, [id]); // Se ejecuta cada vez que el ID en la URL cambie

  if (!note) {
    return <div className={"styles.error"}>Nota no encontrado</div>;
  }

  const handleEdit = async (editNote: NoteCornell) => {
    if (editNote.frontPage === "") {
      editNote.frontPage =
        "https://st.depositphotos.com/3062907/5093/v/450/depositphotos_50938719-stock-illustration-lined-note-paper-sheet.jpg";
    }
    setError(null);
    setLoading(true);

    const body = {
      ...editNote,
      pageStart: Number(note.startPage),
      pageEnd: Number(note.endPage),
      bookId: note.bookId,
      date: new Date(note.date),
    };
    delete body.startPage;
    delete body.endPage;
    try {
      const response = await fetch(`${apiUrl}/api/v1/notes/${id}`, {
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

        throw new Error(JSON.stringify(_error));
      }
      const _note = data.data as NoteCornell;
      setNote(_note);
    } catch (error) {
      console.error("Error saving note:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch" || "Failed to get session") {
          setError([
            {
              message:
                "No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.",
            },
          ]);
          return;
        }
      }
      setError(
        error instanceof Error
          ? JSON.parse(error.message)
          : [{ message: "Error desconocido" }],
      );
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };
  const handleDelete = async (idToDelete: number | string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiUrl}/api/v1/notes/${idToDelete}`, {
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
      setIsDeleting(false);
      navigate(`/mybook/${note.bookId}`);
    } catch (error) {
      console.error("Error deleting book:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setError([
            {
              message:
                "No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.",
            },
          ]);

          return;
        }
      }
      setError(
        error instanceof Error
          ? JSON.parse(error.message)
          : [{ message: "Error desconocido" }],
      );
    } finally {
      setLoading(false);
    }
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
        <button
          className={mainStyles.button}
          onClick={() => setIsEditing(true)}
        >
          ✏️ Editar nota
        </button>
        <button
          className={mainStyles.btnDelete}
          onClick={() => setIsDeleting(!isDeleting)}
          disabled={isDeleting}
        >
          🗑️ Eliminar nota
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      ) : (
        <>
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
          {!isEditing && (
            <div className={styles.cornellContainer}>
              <h1>{note.title}</h1>
              <header className={styles.header}>
                <div className={styles.field}>
                  <span className={styles.label}>Fecha:</span>{" "}
                  {note.date.split("T")[0]}
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Tema:</span> {note.theme}
                </div>
              </header>

              <div className={styles.mainArea}>
                {note.notes.length === 0 && (
                  <p>No hay notas o resumen disponible.</p>
                )}
                {/* Sección de Palabras Clave (Columna Izquierda) */}
                <section className={styles.keywordsSection}>
                  <h3 className={styles.keywordsTitle}>Palabras Clave</h3>
                  <ul className={styles.contentList}>
                    {note.notes.map((keyword: any, index: number) => (
                      <li key={index}>● {keyword.title}</li>
                    ))}
                  </ul>
                </section>

                {/* Sección de Notas Principales (Columna Derecha) */}
                <section className={styles.notesSection}>
                  <h3 className={styles.notesTitle}>Notas Principales</h3>
                  <ul className={styles.contentList}>
                    {note.notes.map((note: any, index: number) =>
                      note.notes.map((content: any, contentIndex: number) => (
                        <li key={`${index}-${contentIndex}`}>- {content}</li>
                      )),
                    )}
                  </ul>
                </section>
              </div>

              {/* Sección de Resumen (Fila Inferior) */}
              <footer className={styles.summarySection}>
                <h3 className={styles.summaryTitle}>Resumen</h3>
                <ul className={styles.contentList}>{note.summary}</ul>
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
        </>
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
