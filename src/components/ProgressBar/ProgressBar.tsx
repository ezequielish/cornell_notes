import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number; // 0 a 100
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  color?: string;
  backgroundColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 20,
  showPercentage = true,
  animated = true,
  color = "#4CAF50",
  backgroundColor = "#e0e0e0",
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Animación suave
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentProgress(Math.min(Math.max(progress, 0), 100));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(Math.min(Math.max(progress, 0), 100));
    }
  }, [progress, animated]);

  const progressStyle = {
    width: `${currentProgress}%`,
    height: `${height}px`,
    backgroundColor: color,
  };

  return (
    <div className={styles.container}>
      {showPercentage && (
        <div className={styles.percentageLabel}>
          Progreso {Math.round(currentProgress)}%
        </div>
      )}
      <div
        className={styles.progressBarBackground}
        style={{ backgroundColor, height: `${height}px` }}
      >
        <div
          className={`${styles.progressBarFill} ${animated ? styles.animated : ""}`}
          style={progressStyle}
        >
          <div className={styles.shine} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
