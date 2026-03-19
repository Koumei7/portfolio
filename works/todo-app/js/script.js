//HTMLから値を取得
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");

//localStrageの初期読み込み
const saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

//保存関数
function save() {
    localStorage.setItem("todos",JSON.stringify(todos));
}

//描画
function render() {
    list.innerHTML = "";

    todos.forEach((todo,index) => {

        const li = document.createElement("li");

        //チェックボックス
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;

        checkbox.addEventListener("change",() =>{
            todos[index].done = checkbox.checked;
            save();
            });
        //テキスト
        const span = document.createElement("span");
        span.textContent = todo.text;

        //削除ボタン
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";

        deleteBtn.addEventListener("click", () => {
            todos.splice(index,1);
            save();
            render();
        });

        //編集ボタン
        const editBtn = document.createElement("button");
        editBtn.textContent = "編集";

        editBtn.addEventListener("click", () => {
            editTask(index)();
            save();
            render();
        });

        function editTask(index) {
            const newText = prompt("タスク編集",todos[index].text);

            //キャンセル or 空文字は無視
            if (!newText || newText.trim() === "") return;

            todos[index].text = newText;
            save();
            render();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        list.appendChild(li);

    });
};

//追加処理
addBtn.addEventListener("click",() =>{
    
    const text = input.value;

    if (text === "") return;

    todos.push({ text: text, done: false});

    save();
    render();

    input.value = "";
});

render();