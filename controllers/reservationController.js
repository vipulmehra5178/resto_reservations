import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, outlet, persons, customization } = req.body;

    // Validation to ensure all fields are present
    if (!name || !email || !phone || !date || !time || !outlet || !persons || !customization) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create and save the reservation
    const newReservation = new Reservation({ name, email, phone, date, time, outlet, persons, customization });
    await newReservation.save();

    res.status(201).json({ message: "🎉 Reservation saved successfully!" });
  } catch (error) {
    console.error("❌ Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation!" });
  }
};
