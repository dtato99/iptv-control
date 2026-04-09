export default async function handler(req, res) {
  try {
    const streamUrl = "https://c2nvdxq.fubohd.com/dsports/mono.m3u8?token=e8f3320e9239f240e345e013f1d071db8441d165-8c-1775761929-1775743929";

    return res.redirect(streamUrl);

  } catch (err) {
    res.status(500).send("Error");
  }
}
