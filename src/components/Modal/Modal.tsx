import styles from "./Modal.module.css";
import React, {
  useEffect,
  useState,
  ReactNode,
  AnimationEvent,
  MouseEvent,
} from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode; // ReactNode permite cualquier contenido (texto, JSX, otros componentes)
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  //Esta función se activa cuando termina la animación de CSS
  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    // Solo actuamos si la animación terminó en el overlay (el padre)
    if (!isOpen) setShouldRender(false);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${
          isOpen ? styles.slideIn : styles.slideOut
        }`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {title && <h2 className={styles.modalTitle}>{title}</h2>}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
