import { useState, ReactElement } from "react";
import { useForm } from "../hooks/useForm";
import mainStyles from "../assets/main.module.css";
import Spinner from "../components/Spinner";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/Icons/Back";

const apiUrl = process.env.REACT_APP_API_URL;

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}
const SignUp = (): ReactElement => {
  const initialState: SignUpForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const validateForm = (values: SignUpForm) => {
    const errors: any = {};
    if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";
    return errors;
  };

  //Hook Form
  const { values, errors, handleChange, handleSubmit } = useForm<SignUpForm>(
    initialState,
    validateForm,
  );

  const onSave: (values: SignUpForm) => void = async (): Promise<void> => {
    setLoading(true);

    const body: SignUpForm = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/auth/sign-up/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data: AuthResponse = await response.json();
      if (response.ok) {
        setLoading(false);
        login(data.user);
        navigate("/");
      } else {
        setError(data?.message || "Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => {
    navigate("/login");
  };
  return (
    <>
      <button className={mainStyles.backFLoat} onClick={goBack}>
        <BackIcon />
      </button>
      <div className={mainStyles.containerLogin}>
        <h2 className={mainStyles.title} style={{ marginBottom: "2rem" }}>
          Registrate
        </h2>

        <form onSubmit={(e) => handleSubmit(e, onSave)}>
          <div className={mainStyles.input}>
            <label>Nombre </label>
            <input
              type="text"
              name="name"
              value={values.name}
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div className={mainStyles.input}>
            <label>Correo </label>
            <input
              type="email"
              name="email"
              autoComplete="username"
              value={values.email}
              required
              onChange={handleChange}
            />
          </div>
          <div className={mainStyles.input} style={{ position: "relative" }}>
            <label>Contraseña </label>
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className={mainStyles.showPassword}
              style={{ top: "23px" }}
            >
              <span>{showPassword ? "🙉" : "🙈"}</span>
            </button>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={mainStyles.input} style={{ position: "relative" }}>
            <label>Confirmar contraseña </label>
            <button
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              type="button"
              className={mainStyles.showPassword}
              style={{ top: "23px" }}
            >
              <span>{showPasswordConfirm ? "🙉" : "🙈"}</span>
            </button>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && errors.confirmPassword.length > 0 && (
              <span className={mainStyles.errorText}>
                {errors.confirmPassword}
              </span>
            )}
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
              Registrar
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
