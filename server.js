require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

// Add error handling for MongoDB connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Update port configuration to work with hosting platforms
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
