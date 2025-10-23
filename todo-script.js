let activeTab = "current";
let currentList = [];
let nextList = [];

const byTab = (tab) => (tab === "current" ? currentList : nextList);

function render() {
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.getElementById(activeTab === "current" ? "tab-current" : "tab-next").classList.add("active");

  document.querySelector(".add-row").style.display = activeTab === "current" ? "flex" : "none";

  const listEl = document.getElementById("list");
  listEl.innerHTML = "";
  const data = byTab(activeTab);

  data.forEach((item, idx) => {
    const li = document.createElement("li");
    if (item.done) li.classList.add("checked");

    const left = document.createElement("div");
    left.className = "item-left";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "checkbox";
    cb.checked = !!item.done;
    cb.onchange = () => { item.done = cb.checked; render(); };

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = item.text;

    left.appendChild(cb);
    left.appendChild(text);

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "Delete";
    del.onclick = () => { data.splice(idx, 1); render(); };

    li.appendChild(left);
    li.appendChild(del);
    listEl.appendChild(li);
  });
}

document.getElementById("tab-current").onclick = () => { activeTab = "current"; render(); };
document.getElementById("tab-next").onclick = () => { activeTab = "next"; render(); };

document.getElementById("addBtn").onclick = () => {
  const inp = document.getElementById("itemInput");
  const val = inp.value.trim();
  if (!val) return;
  currentList.push({ text: val, done: false });
  inp.value = "";
  render();
};

document.getElementById("moveLeftoversBtn").onclick = () => {
  const leftovers = currentList.filter(i => !i.done);
  const existing = new Set(nextList.map(i => i.text.toLowerCase()));
  leftovers.forEach(i => {
    if (!existing.has(i.text.toLowerCase())) nextList.push({ text: i.text, done: false });
  });
  currentList = [];
  render();
};

document.getElementById("loadPresetBtn").onclick = () => {
  const staples = ["Eggs", "Milk", "Bread", "Bananas"];
  const exists = new Set(currentList.map(i => i.text.toLowerCase()));
  staples.forEach(s => {
    if (!exists.has(s.toLowerCase())) currentList.push({ text: s, done: false });
  });
  render();
};

document.getElementById("clearListBtn").onclick = () => {
  if (activeTab === "current") currentList = [];
  else nextList = [];
  render();
};

render();
