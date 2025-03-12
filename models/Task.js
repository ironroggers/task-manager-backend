const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  dueDate: { type: Date },
  estimatedTime: { type: Number }, // Time in hours
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Automatically update `updatedAt` before saving
TaskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Task", TaskSchema);
