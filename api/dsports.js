export default async function handler(req, res) {
  try {
    const pageUrl = "https://la14hd.com/vivo/canales.php?stream=dsports";

    const response = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://la14hd.com/"
      }
    });

    const html = await response.text();

    // 🔍 buscar el m3u8 dentro del HTML
    const match = html.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);

    if (!match) {
      return res.status(500).send("No se encontró m3u8");
    }

    const streamUrl = match[0];

    // 🔁 redirigir al stream actualizado
    return res.redirect(streamUrl);

  } catch (err) {
    res.status(500).send("Error obteniendo stream");
  }
}
