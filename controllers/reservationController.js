import Reservation from "../models/reservationModel.js";

// Helper to normalize time strings like "6:30 PM" to "18:30"
function normalizeTime(timeStr) {
  if (!timeStr) return null;

  // Check if timeStr contains AM or PM (case insensitive)
  const ampmMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (ampmMatch) {
    let hour = parseInt(ampmMatch[1], 10);
    const minute = ampmMatch[2];
    const ampm = ampmMatch[3].toUpperCase();

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    // Format to HH:mm
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  }

  // If already in 24h format HH:mm, just return it after simple validation
  if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
    return timeStr;
  }

  // If format unrecognized, return null to trigger validation error
  return null;
}

export const createReservation = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      date,
      time,
      outlet,
      persons,
      customization,
    } = req.body;

    // Basic required fields check
    if (!name || !email || !phone || !date || !time || !outlet || !persons) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Normalize time to 24h HH:mm format
    const normalizedTime = normalizeTime(time);
    if (!normalizedTime) {
      return res.status(400).json({ message: "Invalid time format." });
    }

    // Normalize persons count
    persons = String(persons);
    if (!["2", "3", "4", "5+"].includes(persons)) {
      // If number > 5, map to "5+"
      const numPersons = parseInt(persons, 10);
      if (isNaN(numPersons) || numPersons < 2) {
        return res.status(400).json({ message: "Invalid persons count." });
      }
      persons = numPersons > 5 ? "5+" : String(numPersons);
    }

    // customization is optional; allow empty or string
    if (!customization) customization = "";

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time: normalizedTime,
      outlet,
      persons,
      customization,
    });

    await newReservation.save();

    res.status(201).json({ message: "🎉 Reservation saved successfully!" });
  } catch (error) {
    console.error("❌ Error creating reservation:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};
