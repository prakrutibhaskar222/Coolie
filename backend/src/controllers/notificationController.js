import Notification from "../models/Notification.js";
 
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};
 
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
}; 
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, read: false },
      { read: true }
    );

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
