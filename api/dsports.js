export default async function handler(req, res) {
  try {
    const url = "https://la14hd.com/vivo/canales.php?stream=dsports";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://la14hd.com/"
      }
    });

    // 🔹 seguir redirecciones automáticamente
    const finalUrl = response.url;

    // 🔹 redirigir directamente al stream final
    return res.redirect(finalUrl);

  } catch (err) {
    res.status(500).send("Error proxy");
  }
}
