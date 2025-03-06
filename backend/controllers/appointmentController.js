const Appointment = require("../models/appointmentModel");

exports.createAppointment = async (req, res) => {
  const { date, time, description } = req.body;
  const appointment = new Appointment({ userId: req.userId, date, time, description });
  await appointment.save();
  res.status(201).json({ message: "Cita creada" });
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.userId });
  res.json(appointments);
};

exports.deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Cita eliminada" });
};
