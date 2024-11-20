const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ from, to, subject, text }) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    console.log("Email envoyé avec succès : ", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
  }
}

module.exports = sendEmail;
