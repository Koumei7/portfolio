const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

// 一覧取得
async function load() {
  const res = await fetch("/api/memos");
  const memos = await res.json();

  list.innerHTML = "";

  memos.forEach(memo => {
    const li = document.createElement("li");
    li.textContent = memo.content;
    list.appendChild(li);
  });
}

// 追加
addBtn.addEventListener("click", async () => {
  const text = input.value;
  if (!text) return;

  await fetch("/api/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: text })
  });

  input.value = "";
  load();
});

// 初期表示
load();