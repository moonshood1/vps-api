const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "mail.vpservices.ci",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Erreur lors de la .vérification SMTP : ", error);
  } else {
    console.log("Le serveur SMTP est prêt à envoyer des emails");
  }
});

async function sendEmail({ from, subject, text }) {
  try {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Erreur lors de la vérification SMTP : ", error);
      } else {
        console.log("Le serveur SMTP est prêt à envoyer des emails");
      }
    });

    const info = await transporter.sendMail({
      from,
      to: "info@vpservices.ci",
      subject,
      text,
    });

    console.log("Email envoyé avec succès ");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
  }
}

module.exports = sendEmail;
