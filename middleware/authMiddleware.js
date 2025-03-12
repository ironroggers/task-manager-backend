const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header Received:", authHeader); // Debugging log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token
  console.log("Extracted Token:", token); // Debugging log

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log

    req.userId = decoded.userId || decoded._id; // Ensure correct field is used
    if (!req.userId) {
      return res.status(400).json({ message: "Invalid Token: Missing userId" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debugging log
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

