import React, { useState } from "react";
import styles from "./BtnFavorite.module.css";
interface BtnFavoriteProps {
  item?: any;
  initialStatus?: boolean;
  onToggle?: (active: boolean, item: any) => void;
}

const BtnFavorite: React.FC<BtnFavoriteProps> = ({
  initialStatus = false,
  item,
  onToggle,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialStatus);

  const handleClick = (item?: any): void => {
    const newState = !isFavorite;
    setIsFavorite(newState);

    if (onToggle) {
      onToggle(item, newState);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${isFavorite ? styles.active : ""}`}
      onClick={() => handleClick(item)}
      aria-label="Marcar como favorito"
    >
      <span className={styles.emoji}>{isFavorite ? "❤️" : "🤍"}</span>
    </button>
  );
};

export default BtnFavorite;
