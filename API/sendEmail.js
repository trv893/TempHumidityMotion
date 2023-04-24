const nodemailer = require('nodemailer');
require('dotenv').config();
const logger = require('./logger'); // Import the logger

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Message sent: ${info.messageId}`); // Use logger.info
  } catch (error) {
    logger.error(`Error sending email: ${error}`); // Use logger.error
  }
}

module.exports = sendEmail;
