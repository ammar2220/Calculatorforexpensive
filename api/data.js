import { kv } from "@vercel/kv";

const KEY = "wallet_multi_accounts_v7";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await kv.get(KEY);
      return res.status(200).json(data || null);
    } catch (err) {
      console.error("KV get error:", err);
      return res.status(500).json({ error: "تعذر تحميل الداتا" });
    }
  }

  if (req.method === "POST") {
    try {
      const body = req.body;
      if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "بيانات غير صحيحة" });
      }
      await kv.set(KEY, body);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("KV set error:", err);
      return res.status(500).json({ error: "تعذر حفظ الداتا" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
