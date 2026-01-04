import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* Add a tip */
app.post("/tips", (req, res) => {
  const { name, amount, message } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  db.run(
    `INSERT INTO tips (name, amount, message) VALUES (?, ?, ?)`,
    [name || "Anonymous", amount, message],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ success: true, id: this.lastID });
    }
  );
});

/* Get total tips */
app.get("/tips/total", (req, res) => {
  db.get(`SELECT SUM(amount) as total FROM tips`, [], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json({ total: row.total || 0 });
  });
});

/* Get recent tips */
app.get("/tips", (req, res) => {
  db.all(
    `SELECT name, amount, message, created_at FROM tips ORDER BY created_at DESC LIMIT 10`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
