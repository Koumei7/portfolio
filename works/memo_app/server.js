const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./db/database.sqlite");

app.use(express.static("public"));

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )
  `);
});



app.lisapp.use(express.json()); // ← まだなら追加

app.post("/api/memos", (req, res) => {
  const { content } = req.body;

  db.run(
    "INSERT INTO memos (content) VALUES (?)",
    [content],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID });
    }
  );
});

app.use(express.json()); // ← まだなら追加

app.post("/api/memos", (req, res) => {
  const { content } = req.body;

  db.run(
    "INSERT INTO memos (content) VALUES (?)",
    [content],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID });
    }
  );
});

app.listen(3000, () => {
  console.log("起動: http://localhost:3000");
});