// services/MailService.js
import nodemailer from "nodemailer";

export const sendWeatherReport = async (email, city, fetchWeatherData) => {
  try {
    const weatherData = await fetchWeatherData(city);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PW,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Hourly Weather Report",
      // text: `Temperature: ${weatherData.temperature}°C, Description: ${weatherData.description}`,
      html: `
      <html>
        <body>
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hourly Weather Report</h2>
            <p>Dear User,</p>
            <p>Here is the latest weather report for location : ${city}:</p>
            <ul>
              <li><strong>Temperature:</strong> ${weatherData.temperature}°C</li>
              <li><strong>Description:</strong> ${weatherData.description}</li>
            </ul>
            <p>Stay informed and have a great day!</p>
            <p>Best regards,</p>
            <p>Your Weather Notification Service</p>
          </div>
        </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
