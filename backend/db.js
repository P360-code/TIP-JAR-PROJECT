import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./tips.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      amount REAL NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
