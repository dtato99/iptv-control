export default async function handler(req, res) {
  try {
    const baseUrl = "https://la14hd.com";
    const url = baseUrl + "/vivo/canales.php?stream=dsports";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": baseUrl
      }
    });

    let data = await response.text();

    // 🔹 corregir rutas relativas del m3u8
    data = data.replace(/(?!https?:\/\/)([^\s]+)/g, (match) => {
      if (match.startsWith("#")) return match;
      return baseUrl + "/" + match;
    });

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(data);

  } catch (err) {
    res.status(500).send("Error proxy");
  }
}
