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

    //削除ボタン
    li.addEventListener("click", () => {
    deleteMemo(memo.id);
    });


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

async function deleteMemo(id) {
  await fetch(`/api/memos/${id}`, {
    method: "DELETE"
  });

  load();
}

// 初期表示
load();