import styles from "../assets/header.module.css";
function Header({ children }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>📚 Biblioteca de Notas Cornell</h1>
      {children}
    </header>
  );
}

export default Header;
