import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* Add a tip */
app.post("/tips", (req, res) => {
  const { name, amount, message, email } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Valid positive amount is required" });
  }

  db.run(
    `INSERT INTO tips (name, amount, message, email) VALUES (?, ?, ?, ?)`,
    [name || "Anonymous", amount, message, email],
    function (err) {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Tip added successfully, ID:", this.lastID);
      res.status(201).json({ success: true, id: this.lastID });
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
