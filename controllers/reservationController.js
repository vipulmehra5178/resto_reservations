import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res, next) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();

    res.status(201).json({ message: "🎉 Reservation saved successfully!" });
  } catch (error) {
    next(error);
  }
};
