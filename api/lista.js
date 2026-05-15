// server.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();

const LISTA =
  "https://drive.google.com/uc?export=download&id=18DyvSvMy5_5E12gCjWlr3oHrEAMoFiSv";

app.get("/lista", async (req, res) => {
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  // SOLO permitir Sparkle
  const permitido =
    ua.includes("sparkle") ||
    ua.includes("exoplayer");

  // Bloquear navegadores y otros players
  if (!permitido) {
    return res.redirect("https://google.com");
  }

  try {
    const response = await fetch(LISTA);

    const texto = await response.text();

    res.setHeader("Content-Type", "application/x-mpegURL");
    res.send(texto);

  } catch (e) {
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
});
