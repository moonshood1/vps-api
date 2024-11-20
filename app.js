const dotenv = require("dotenv");
const express = require("express");
const morgan = require("express");
const cors = require("cors");
const sendEmail = require("./services/nodemailer");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email-to-vps", async (req, res) => {
  const { from, subject, text } = req.body;

  try {
    console.log({
      from,
      subject,
      text,
    });

    await sendEmail({ from, subject, text });

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur d'envoi d'email : ", error);
    res.status(500).json({ error: "Échec de l'envoi de l'email." });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
