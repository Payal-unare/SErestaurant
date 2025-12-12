require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reservationRoutes = require("./routes/reservation.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const menuRoutes = require("./routes/menu.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);

// MongoDB Connection (RENDER FRIENDLY)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});
