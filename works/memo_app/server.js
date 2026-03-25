const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./db/database.sqlite");

// ミドルウェア
app.use(express.static("public"));
app.use(express.json());

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )
  `);
});

// 追加
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

// 取得
app.get("/api/memos", (req, res) => {
  db.all("SELECT * FROM memos", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// 削除
app.delete("/api/memos/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM memos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true });
  });
});

// 起動
app.listen(3000, () => {
  console.log("起動: http://localhost:3000");
});