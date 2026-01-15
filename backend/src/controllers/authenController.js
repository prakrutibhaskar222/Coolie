import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {sendEmail} from "../utils/sendEmail.js";
import { validatePasswordStrength } from "../utils/passwordPolicy.js";



/* ================= JWT TOKEN ================= */
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

/* ================= REGISTER ================= */
/* REGISTER */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Decide role safely
    let assignedRole = "user";
    if (role === "worker") assignedRole = "worker";
    if (role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin registration is not allowed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 1. CREATE USER FIRST
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: assignedRole,
    });

    // ✅ 2. CREATE WORKER AFTER USER EXISTS
    if (assignedRole === "worker") {
      await Worker.create({
        userId: user._id,
        name: user.name,
        phone: user.phone,
        skills: [],
      });
    }

    res.status(201).json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= CURRENT USER ================= */
export const me = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (req, res) => {
  try {
    console.log("FORGOT PASSWORD HIT", req.body);

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });
    console.log("FORGOT USER FOUND:", !!user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    console.log("FORGOT RAW TOKEN:", resetToken);
    console.log("FORGOT HASH SAVED:", user.resetPasswordToken);

    // 🔥 TEMP: log link instead of email
    console.log(
      `RESET LINK: http://localhost:5173/reset-password/${resetToken}`
    );

    return res.json({
      success: true,
      message: "Reset token generated (email temporarily disabled)"
    });

  } catch (err) {
    console.error("FORGOT PASSWORD CRASH:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



/* ================= RESET PASSWORD ================= */

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("RESET BODY:", req.body);

    // 1️⃣ Validate input
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const strengthError = validatePasswordStrength(password);
    if (strengthError) {
      return res.status(400).json({ message: strengthError });
    }

    // 2️⃣ Hash the token from URL (ONLY use `token`)
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log("RESET HASH:", hashedToken);

    // 3️⃣ Find user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }
    });

    console.log("RESET USER FOUND:", !!user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 4️⃣ Update password
    user.password = password;

    // 5️⃣ Audit log
    if (!Array.isArray(user.passwordResetHistory)) {
      user.passwordResetHistory = [];
    }

    user.passwordResetHistory.push({
      at: new Date(),
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    // 6️⃣ Invalidate token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // 7️⃣ Auto-login
    const jwt = generateToken(user._id);

    return res.json({
      success: true,
      message: "Password reset successful",
      token: jwt,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    console.error("RESET PASSWORD CRASH:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


/* ================= CREATE ADMIN (ONE-TIME) ================= */
export const createAdmin = async (req, res) => {
  try {
    // ✅ FIRST: destructure
    const { name, email, password, secret } = req.body;

    // ✅ THEN: debug logs (optional)
    console.log("ENV SECRET:", process.env.ADMIN_CREATE_SECRET);
    console.log("REQ SECRET:", secret);

    // 🔒 Security check
    if (secret !== process.env.ADMIN_CREATE_SECRET) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
