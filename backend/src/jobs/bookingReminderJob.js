import cron from "node-cron";
import Booking from "../models/Booking.js";
import { generateOTP } from "../utils/otp.js";
import { sendBookingReminderEmail } from "../utils/sendBookingRemainderEmail.js";

cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running booking reminder job");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split("T")[0];

  const bookings = await Booking.find({
    date: dateStr,
    reminderSent: false
  });

  for (const booking of bookings) {
    const { otp, hashedOtp } = generateOTP();

    booking.serviceOTP = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      verified: false
    };

    booking.reminderSent = true;
    await booking.save();

    const worker = booking.workerAssigned
      ? await Worker.findById(booking.workerAssigned)
      : null;

    await sendBookingReminderEmail({
      to: booking.customerEmail,
      booking,
      worker,
      otp
    });

    console.log("📧 Reminder sent for booking:", booking._id);
  }
});
