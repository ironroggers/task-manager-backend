const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, estimatedTime } = req.body;

    const task = new Task({
      title,
      description,
      priority: priority || "Medium",
      status: status || "Pending",
      dueDate: dueDate ? new Date(dueDate) : null,
      estimatedTime,
      user: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, estimatedTime } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedTime,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
