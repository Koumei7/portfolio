const sqlite3 = require("sqlite3").verbose();

// DBに接続（なければ作成）
const db = new sqlite3.Database("./todo.db");

// データ取得
db.all("SELECT * FROM todos", (err, rows) => {
  if (err) {
    console.error("エラー:", err);
    return;
  }
  console.log(rows);
});