export default async function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  if (
    ua.includes("Chrome") ||
    ua.includes("Mozilla") ||
    ua.includes("Safari")
  ) {
    return res.redirect("https://google.com");
  }

  try {
    const listaUrl = "https://drive.google.com/uc?export=download&id=119AbosoTLjIeSlbeMjbnrVSzsuDhCM1X";

    const response = await fetch(listaUrl);
    let data = await response.text();

    data = data.replace(
      "https://la14hd.com/vivo/canales.php?stream=dsports",
      "https://TU-APP.vercel.app/api/dsports"
    );

    res.setHeader("Content-Type", "audio/x-mpegurl");
    res.status(200).send(data);

  } catch (err) {
    res.status(500).send("Error");
  }
}
