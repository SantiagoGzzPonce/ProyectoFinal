import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";  // Asegúrate de crear el archivo Register.css

const API_URL = "http://localhost:5000";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");  // Nuevo estado para el email
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),  // Enviamos el email
    });
    if (res.ok) {
      navigate("/");  // Redirige al login después del registro exitoso
    } else {
      alert("Error al registrar usuario");
    }
  };

  const handleGoToLogin = () => {
    navigate("/");  // Navegar a la página de Login
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registro</h2>
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
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleRegister} className="register-btn">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <button onClick={handleGoToLogin} className="login-btn">Iniciar sesión</button></p>
      </div>
    </div>
  );
};

export default Register;
