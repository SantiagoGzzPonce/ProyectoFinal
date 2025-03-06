const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const appointmentController = require("../controllers/appointmentController");

router.post("/appointments", authMiddleware, appointmentController.createAppointment);
router.get("/appointments", authMiddleware, appointmentController.getAppointments);
router.delete("/appointments/:id", authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
