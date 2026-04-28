import React from "react";
import styles from "./ReadingStats.module.css";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={styles.card} style={{ borderTopColor: color }}>
      <div
        className={styles.cardIcon}
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardValue}>{value}</div>
      </div>
    </div>
  );
};

interface ReadingStatsProps {
  books: number;
  pages: number;
  completed: number;
  hours?: number;
}

const ReadingStats: React.FC<ReadingStatsProps> = ({
  books,
  completed,
  pages,
  hours,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        {/* Tarjeta 1: Libros Totales y Leídos */}
        <StatCard title="Libros" value={`${books}`} icon="📖" color="#4CAF50" />

        {/* Tarjeta 2: Páginas Leídas */}
        <StatCard
          title="Libros completados"
          value={completed}
          icon="📖"
          color="#2196F3"
        />

        {/* Tarjeta : Páginas Leídas */}
        <StatCard
          title="Páginas Leídas"
          value={pages}
          icon="📄"
          color="#FF9800"
        />

        {/* Tarjeta : Horas de Lectura */}
        {/* <StatCard
          title="Horas de Lectura"
          value={`${hours.read}`}
          icon="⏱️"
          color="#FF9800"
        /> */}
      </div>
    </div>
  );
};

export default ReadingStats;
