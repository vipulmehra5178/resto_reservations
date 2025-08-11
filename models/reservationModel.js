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
      validator: (value) => {
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      },
      message: "Date must not be in the past.",
    },
  },
  time: {
    type: String,
    required: true,
  },
  outlet: {
    type: String,
    required: true,
    enum: ["Sector-15", "Sector-20", "Sector-45", "Sector-60"],
  },
  persons: {
    type: String,
    required: true,
    enum: ["2", "3", "4", "5+"],
  },
  customization: {
    type: String,
    required: false, 
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
