import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^\d{10}$/,
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: (value) => new Date(value) >= new Date(),
      message: "Date must not be in the past.",
    },
  },
  time: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/, 
  },
  outlet: {
    type: String,
    required: true,
    enum: ["Sector-15", "Sector-20", "Sector-45", "Sector-60"],
  },
  persons: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4+"],
  },
  customization: {
    type: String,
    required: true,
    enum: [
      "Window Seat",
      "High Chair",
      "Outdoor Seating",
      "Birthday Setup",
      "Anniversary Setup",
      "Date Setup",
      "Other",
    ],
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
