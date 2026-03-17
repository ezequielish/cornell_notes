import { ReactNode } from "react";
import style from "./LayoutCarrusel.module.css";

// 1. Definimos la interfaz de las Props
interface LayoutCarruselProps {
  children: ReactNode;
  title?: string;
}

export default function LayoutCarrusel({
  children,
  title,
}: LayoutCarruselProps) {
  return (
    <div className={style.wrapperCarrusel}>
      <p className={style.carruselTitle}>{title}</p>
      {children}
    </div>
  );
}
