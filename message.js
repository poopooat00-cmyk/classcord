let messages = {}; // { roomLink: [{ name, className, text, time }, ...] }

export default function handler(req, res) {
  if (req.method === "POST") {
    const { roomLink, name, className, text } = req.body;
    if (!roomLink || !name || !text || !className) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    if (!messages[roomLink]) messages[roomLink] = [];
    messages[roomLink].push({ name, className, text, time: new Date() });
    return res.json({ success: true });
  }

  if (req.method === "GET") {
    const roomLink = req.query.roomLink;
    if (!roomLink) return res.status(400).json({ success: false, message: "Missing roomLink" });
    return res.json(messages[roomLink] || []);
  }

  res.status(405).json({ success: false, message: "Method not allowed" });
}
