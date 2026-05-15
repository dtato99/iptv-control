export default async function handler(req, res) {

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

  if (!allow || blocked) {
    return res.status(403).send("Forbidden");
  }

  // Elegir lista
  const lista = req.query.lista || "1";

  let url = "";

  // LISTA 1
  if (lista === "1") {

    url =
      "https://drive.google.com/uc?export=download&id=1IL3ayNtVyUj7L5EbLxb7gIveGQXEConw";

  }

  // LISTA 2
  if (lista === "2") {

    url =
      "https://drive.google.com/uc?export=download&id=18DyvSvMy5_5E12gCjWlr3oHrEAMoFiSv";

  }

  try {

    const response = await fetch(url);

    const text = await response.text();

    res.setHeader("Content-Type", "audio/x-mpegurl");

    return res.status(200).send(text);

  } catch (e) {

    return res.status(500).send("Error");

  }
}
