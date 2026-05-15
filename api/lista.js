export default async function handler(req, res) {

  // LISTA REAL
  const REAL_URL =
    "https://drive.google.com/uc?export=download&id=18DyvSvMy5_5E12gCjWlr3oHrEAMoFiSv";

  // USER AGENT
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

    // DESCARGAR LISTA
    const response = await fetch(REAL_URL);

    const text = await response.text();

    // FORMATO IPTV
    res.setHeader(
      "Content-Type",
      "audio/x-mpegurl"
    );

    // EVITAR CACHE
    res.setHeader(
      "Cache-Control",
      "no-store"
    );

    // ENVIAR LISTA
    return res.status(200).send(text);

  } catch (e) {

    return res.status(500).send("Error");

  }
}
