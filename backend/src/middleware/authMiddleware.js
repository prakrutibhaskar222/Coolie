import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};
 
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export const workerOnly = (req, res, next) => {
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Worker access only" });
  }

  if (!req.user.verified) {
    return res.status(403).json({
      message: "Your account is pending admin verification"
    });
  }

  next();
};

