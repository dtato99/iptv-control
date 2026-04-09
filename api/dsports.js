export default async function handler(req, res) {
  try {
    const pageUrl = "https://la14hd.com/vivo/canales.php?stream=dsports";

    const response = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Referer": "https://la14hd.com/",
        "Origin": "https://la14hd.com",
        "Accept": "*/*"
      }
    });

    const html = await response.text();

    const match = html.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);

    if (!match) {
      return res.status(500).send("No se encontró m3u8");
    }

    const streamUrl = match[0];

    return res.redirect(streamUrl);

  } catch (err) {
    res.status(500).send("Error 403 o bloqueo");
  }
}
