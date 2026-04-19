import {
  useState,
  ReactElement,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import mainStyles from "../../assets/main.module.css";
import Spinner from "../Spinner";
const apiUrl = process.env.REACT_APP_API_URL;
// Definimos la interfaz de la respuesta para tener autocompletado
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const Login = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.token) {
        login(data.user);
        navigate("/");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setError("No se pudo conectar con el servidor");
      setPassword("");
    } finally {
      setPassword("");
      setLoading(false);
    }
  };

  const signUp = () => {
    navigate("/signup");
  };
  // Manejadores tipados para los inputs
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className={mainStyles.containerLogin}>
      <h2 className={mainStyles.title}>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <div className={mainStyles.input}>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Correo electrónico"
            required
            className={mainStyles.input}
            name="email"
            autoComplete="username"
          />
        </div>
        <div className={mainStyles.input} style={{ position: "relative" }}>
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className={mainStyles.showPassword}
          >
            <span>{showPassword ? "🙉" : "🙈"}</span>
          </button>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            placeholder="Contraseña"
            required
            className={mainStyles.input}
            autoComplete="current-password"
            name="password"
          />
        </div>

        {error && (
          <p
            className={mainStyles.errorText}
            style={{ margin: "0 1rem 1rem 0" }}
          >
            {error}
          </p>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className={mainStyles.btnGuardar}
            style={{ width: "100%" }}
          >
            Entrar
          </button>
        )}

        <button
          onClick={signUp}
          className={mainStyles.btnPrimary}
          style={{ marginTop: "2rem", width: "100%" }}
        >
          Registrate
        </button>
      </form>
    </div>
  );
};

export default Login;
