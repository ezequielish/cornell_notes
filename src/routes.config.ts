// routes.config.js
export const ROUTES = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/mylibrary", label: "Mis Libros", emoji: "📚" },
  { path: "/favorites", label: "Mis Favoritos", emoji: "❤️" },
];

export interface RouteItem {
  path: string;
  label: string;
  emoji?: string; // Opcional por si alguna ruta no tiene
}
