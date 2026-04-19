import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
const apiUrl = process.env.REACT_APP_API_URL;

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user_profile");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/get-session`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();

        setUser(data.user);
        localStorage.setItem("user_profile", JSON.stringify(data.user));
      } catch {
    
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user_profile", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_profile");
    // se debe llamar al endpoint de sign-out de Better Auth
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar la auth en cualquier parte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
