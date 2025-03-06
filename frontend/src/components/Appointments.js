import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css"; // Importando el archivo CSS

const API_URL = "http://localhost:5000";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAppointments(data);
  };

  const handleAddAppointment = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date, time, description }),
    });
    fetchAppointments();
  };

  const handleDeleteAppointment = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/appointments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAppointments();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="appointments-container">
      <h2>Citas Médicas</h2>
      <div className="appointment-form">
        <input
          type="date"
          className="input-field"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="input-field"
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          className="input-field"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" onClick={handleAddAppointment}>Añadir Cita</button>
      </div>
      
      <div className="appointments-list">
        <h3>Tus Citas</h3>
        <ul>
          {appointments.map((app) => (
            <li key={app._id} className="appointment-item">
              {app.date} {app.time} - {app.description}
              <button
                className="btn btn-delete"
                onClick={() => handleDeleteAppointment(app._id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-logout" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Appointments;
