import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { ROUTES, RouteItem } from "../../routes.config.ts";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Botón Hamburguesa */}
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>Notas Cornell</div>
        <nav>
          {(ROUTES as RouteItem[]).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.emoji && <span className={styles.emoji}>{item.emoji}</span>}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay opcional para cerrar el menú al hacer click fuera */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
