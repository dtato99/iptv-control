export default async function handler(req, res) {

  const REAL_URL =
    "https://drive.google.com/uc?export=download&id=119AbosoTLjIeSlbeMjbnrVSzsuDhCM1X";

  const ua = (req.headers["user-agent"] || "").toLowerCase();

  // SOLO SPARKLE TV
  const esSparkle =
    ua.includes("sparkle") ||
    ua.includes("sparkletv") ||
    ua.includes("sparkle tv");

  // TODO LO DEMÁS -> GOOGLE
  if (!esSparkle) {
    return res.redirect("https://google.com");
  }

  try {

    const response = await fetch(REAL_URL);

    const text = await response.text();

    res.setHeader(
      "Content-Type",
      "audio/x-mpegurl"
    );

    res.setHeader(
      "Cache-Control",
      "no-store"
    );

    return res.status(200).send(text);

  } catch (e) {

    return res.status(500).send("Error");

  }
}
