export default async function handler(req, res) {

  // Detectar User-Agent
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  console.log("USER AGENT:", ua);

  // SOLO permitir Sparkle
  const allow =
    ua.includes("sparkle") ||
    ua.includes("okhttp");

  // Bloquear navegadores y otros players
  const blocked =
    ua.includes("mozilla") ||
    ua.includes("chrome") ||
    ua.includes("firefox") ||
    ua.includes("vlc") ||
    ua.includes("smarters") ||
    ua.includes("iptv");

  // Si NO es Sparkle -> ERROR
  if (!allow || blocked) {

    return res.status(403).send("Forbidden");

  }

  // Lista REAL de Drive
  const url =
    "https://drive.google.com/uc?export=download&id=18DyvSvMy5_5E12gCjWlr3oHrEAMoFiSv";

  try {

    const response = await fetch(url);

    const text = await response.text();

    // Tipo M3U
    res.setHeader("Content-Type", "audio/x-mpegurl");

    return res.status(200).send(text);

  } catch (e) {

    return res.status(500).send("Error");

  }
}
