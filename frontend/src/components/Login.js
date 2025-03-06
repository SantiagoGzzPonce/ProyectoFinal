import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Asegúrate de crear el archivo Login.css

const API_URL = "http://localhost:5000";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/appointments");
    } else {
      alert("Credenciales inválidas.");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");  // Navegar a la página de Registro
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="input-group">
            <input
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-btn">Ingresar</button>
        </form>
        <p>¿No tienes cuenta? <button onClick={handleGoToRegister} className="register-btn">Registrarse</button></p>
      </div>
    </div>
  );
};

export default Login;
