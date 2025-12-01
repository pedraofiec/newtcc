import React from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import LoginService from "../services/LoginService";
import useUserStore from "../../shared/store/user-store";
import useAuthStore from "../../shared/store/auth-store";
import { jwtDecode } from "jwt-decode";

const LoginForm = ({ goToRegister }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setMe } = useUserStore();
  const { setAuthData } = useAuthStore();

  // redirect=/alguma-rota (senão vai pra /home)
  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/home";

  // 🔁 Função que restaura login a partir do token já salvo
  const refresh = React.useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const userData = jwtDecode(token);

      // tenta descobrir o papel/role dentro do token
      const roleFromToken =
        userData.role ||
        userData.tipo ||
        userData.authorities?.[0] ||
        userData.authority ||
        null;

      if (!roleFromToken) {
        console.warn("Não foi possível encontrar o role no token:", userData);
        return;
      }

      // atualiza stores globais
      setAuthData(userData);
      setMe(roleFromToken, userData);

      // usuário já logado → manda pra rota alvo
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error("Erro ao decodificar token no refresh:", e);
      localStorage.removeItem("accessToken");
    }
  }, [navigate, redirectTo, setAuthData, setMe]);

  // Ao carregar a página, se já tiver token, tenta logar direto
  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Chama o backend real
      const data = await LoginService.login({ email, password });

      // 2. Descobre o campo do token na resposta
      const token =
        data.accessToken ||
        data.token ||
        data.jwtToken ||
        data.jwt ||
        null;

      if (!token) {
        console.error("Resposta de login sem token:", data);
        setError("Não foi possível obter o token de autenticação.");
        setIsSubmitting(false);
        return;
      }

      // 3. Salva token
      localStorage.setItem("accessToken", token);

      // 4. Decodifica token
      const userData = jwtDecode(token);

      // Mesmo esquema de role
      const roleFromToken =
        userData.role ||
        userData.tipo ||
        userData.authorities?.[0] ||
        userData.authority ||
        null;

      if (!roleFromToken) {
        console.warn("Não foi possível encontrar o role no token:", userData);
      }

      // 5. Atualiza stores globais
      setAuthData(userData);
      setMe(roleFromToken, userData);

      // 6. Navega pra /home (ou pro redirect)
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error("Erro no handleSubmit:", e);

      // aqui e.response provavelmente NÃO existe porque o LoginService joga Error simples
      setError("Não foi possível entrar. Verifique seus dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-[100dvh] flex slideIn flex-col items-center justify-center p-4 z-100"
      style={{ backgroundPosition: "center" }}
    >
      <div className="relative w-full max-w-sm p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-white/50">
        <div className="flex justify-center mb-6">
          <FaUser className="text-8xl text-gray-800" />
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Senha"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-16 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPass ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <button
            type="button"
            onClick={goToRegister}
            className="block w-full text-sm font-medium hover:underline mb-1"
          >
            Criar conta
          </button>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="block w-full text-sm font-medium hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
