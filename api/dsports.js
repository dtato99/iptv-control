export default async function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  // bloquear navegador
  if (
    ua.includes("Chrome") ||
    ua.includes("Mozilla") ||
    ua.includes("Safari")
  ) {
    return res.redirect("https://google.com");
  }

  try {
    const response = await fetch("https://la14hd.com/vivo/canales.php?stream=dsports");
    const data = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.status(200).send(data);

  } catch (err) {
    res.status(500).send("Error");
  }
}
