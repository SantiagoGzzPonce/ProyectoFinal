import React from "react";
import { Route, Routes } from "react-router-dom"; // ❌ No importes BrowserRouter aquí
import Login from "./components/Login";
import Register from "./components/Register";
import Appointments from "./components/Appointments";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/appointments" element={<Appointments />} />
  </Routes>
);

export default App;
