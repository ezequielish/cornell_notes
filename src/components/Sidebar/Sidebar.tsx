import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import mainStyles from "../../assets/main.module.css";
import { useAuth } from "../../AuthContext";
import { ROUTES, RouteItem } from "../../routes.config";
const apiUrl = process.env.REACT_APP_API_URL;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await fetch(`${apiUrl}/api/auth/sign-out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      logout();
      navigate("/login");
    }
  };
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
        <nav>
          <div className={styles.header}>Notas Cornell</div>

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

        <div className={styles.footer}>
          <button onClick={signOut} className={mainStyles.btnCancel}>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Overlay opcional para cerrar el menú al hacer click fuera */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
